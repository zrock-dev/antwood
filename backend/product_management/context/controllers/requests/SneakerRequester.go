package requests

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"product_management/app/models"
	"product_management/context/repository"
)

func InsertSneaker(c *fiber.Ctx) error {
	var newSneaker = models.DefaultSneaker()

	if err := c.BodyParser(newSneaker); err != nil {
		return c.Status(400).SendString("Invalid sneaker data")
	}

	newSneaker.LastDate = primitive.NewDateTimeFromTime(time.Now())

	insertResult, err := repository.InsertOneSneaker(*newSneaker)
	if err != nil {
		return c.Status(500).SendString("Error inserting the sneaker")
	}

	insertedID, ok := insertResult.InsertedID.(primitive.ObjectID)
	if !ok {
		return c.Status(500).SendString("Error getting the sneaker id")
	}

	return c.JSON(struct {
		Message string             `json:"message"`
		ID      primitive.ObjectID `json:"id"`
	}{Message: "Successfully created sneaker", ID: insertedID})
}

func UpdateSneakerById(c *fiber.Ctx) error {
	sneakerID := c.Params("id")
	var updatedSneaker models.Sneaker
	if err := c.BodyParser(&updatedSneaker); err != nil {
		return c.Status(400).SendString("Invalid update data")
	}

	update := validateSneakerUpdateData(updatedSneaker)
	wasUpdated, message := repository.UpdateSneakerById(sneakerID, bson.M{"$set": update})
	if !wasUpdated {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}

func validateSneakerUpdateData(updatedSneaker models.Sneaker) bson.M {
	toUpdate := bson.M{}
	if updatedSneaker.Name != "" {
		toUpdate["name"] = updatedSneaker.Name
	}
	if updatedSneaker.Description != "" {
		toUpdate["description"] = updatedSneaker.Description
	}
	if updatedSneaker.Brand != "" {
		toUpdate["brand"] = updatedSneaker.Brand
	}
	if updatedSneaker.Price > 0 {
		toUpdate["price"] = updatedSneaker.Price
	}
	if len(updatedSneaker.Tags) > 0 {
		toUpdate["tags"] = updatedSneaker.Tags
	}

	if updatedSneaker.SalesQuantity > 0 {
		toUpdate["salesQuantity"] = updatedSneaker.SalesQuantity
	}
	if updatedSneaker.PromotionCode != (primitive.ObjectID{}) {
		toUpdate["promotionCode"] = updatedSneaker.PromotionCode
	}
	toUpdate["lastDate"] = primitive.NewDateTimeFromTime(time.Now())

	return toUpdate
}

func DeleteSneakerById(c *fiber.Ctx) error {

	sneakerObjectId, err := primitive.ObjectIDFromHex(c.Params("id"))

	if err != nil {
		return c.Status(500).SendString("Invalid sneaker id")
	}

	found, sneaker := repository.FindSneaker(sneakerObjectId)

	if !found {
		return c.Status(500).SendString("Sneaker not found")
	}

	for _, sneakerColor := range sneaker.Colors {
		wasDeleted, messageError := repository.DeleteShoeColorWithCloudDeps(sneakerColor.ID)
		if !wasDeleted {
			return c.Status(500).SendString(messageError)
		}
	}

	result := repository.DeleteSneakerById(sneakerObjectId)

	if result {
		return c.SendString("Sneaker successfully deleted")
	} else {
		return c.Status(500).SendString("Error deleting sneaker")
	}
}

func RemoveSneakerColor(c *fiber.Ctx) error {
	sneakerID := c.Params("id")
	idColor := c.Params("idcolor")

	colorObjectID, err := primitive.ObjectIDFromHex(idColor)
	if err != nil {
		return c.Status(500).SendString("Invalid id color")
	}

	sneakerObjectId, err := primitive.ObjectIDFromHex(sneakerID)
	if err != nil {
		return c.Status(500).SendString("Invalid id color")
	}

	wasRemoved, message := repository.RemoveColorFromSneaker(sneakerObjectId, colorObjectID)
	if !wasRemoved {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}
