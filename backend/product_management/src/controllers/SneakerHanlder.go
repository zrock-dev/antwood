package controllers

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"antwood_team/product_management/src/database"
	"antwood_team/product_management/src/models"
)

func InsertSneaker(c *fiber.Ctx) error {
	var newSneaker = models.DefaultSneaker()

	if err := c.BodyParser(newSneaker); err != nil {
		return c.Status(400).SendString("Invalid sneaker data")
	}

	newSneaker.LastDate = primitive.NewDateTimeFromTime(time.Now())

	insertResult, err := database.SneakerCollection.
		InsertOne(context.TODO(), newSneaker)
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
	wasUpdated := updateSneakerById(sneakerID, update)
	if !wasUpdated {
		return c.Status(500).SendString("Error updating sneaker")
	}

	return c.SendString("Sneaker updated successfully")
}

func AddColorsToSneaker(sneakerID string, InsertedIDs []primitive.ObjectID) bool {
	return updateSneakerById(
		sneakerID,
		bson.M{
			"colors":   bson.M{"$each": InsertedIDs},
			"lastDate": primitive.NewDateTimeFromTime(time.Now())})
}

func UpdateLastDate(sneakerID string) bool {
	return updateSneakerById(
		sneakerID,
		bson.M{"lastDate": primitive.NewDateTimeFromTime(time.Now())})
}

func validateSneakerUpdateData(updatedSneaker models.Sneaker) bson.M {
	toUpdate := bson.M{}
	if updatedSneaker.Name != "" {
		toUpdate["name"] = updatedSneaker.Name
	}
	if updatedSneaker.Description != "" {
		toUpdate["description"] = updatedSneaker.Description
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

func updateSneakerById(sneakerID string, toUpdate bson.M) bool {
	if sneakerID != "" {
		id, err := primitive.ObjectIDFromHex(sneakerID)
		if err != nil {
			return false
		}
		_, err = database.SneakerCollection.UpdateOne(
			context.TODO(),
			bson.M{"_id": id},
			bson.M{"$set": toUpdate},
		)

		if err != nil {
			return false
		}

		return true
	}

	return false

}

func DeleteSneakerById(c *fiber.Ctx) error {
	var id, _ = primitive.ObjectIDFromHex(c.Params("id"))
	_, err := database.SneakerCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	if err != nil {
		return c.Status(500).SendString("Error during sneaker deleting")
	}

	return c.SendString("Sneaker successfully deleted")
}
