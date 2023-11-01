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

func EditSneakerById(c *fiber.Ctx) error {
	sneakerID := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(sneakerID)
	if err != nil {
		return c.Status(400).SendString("Invalid sneaker ID")
	}

	update := bson.M{}
	var updatedSneaker models.Sneaker
	if err := c.BodyParser(&updatedSneaker); err != nil {
		return c.Status(400).SendString("Invalid update data")
	}

	update = velidateSneakerData(updatedSneaker, update)
	result, err := database.SneakerCollection.UpdateOne(
		context.TODO(),
		bson.M{"_id": objectID},
		bson.M{"$set": update},
	)

	if err != nil {
		return c.Status(500).SendString("Error updating sneaker")
	}

	if result.ModifiedCount == 0 {
		return c.Status(404).SendString("Sneaker not found")
	}

	return c.SendString("Sneaker updated successfully")
}

func velidateSneakerData(updatedSneaker models.Sneaker, update bson.M) bson.M {
	if updatedSneaker.Name != "" {
		update["name"] = updatedSneaker.Name
	}
	if updatedSneaker.Description != "" {
		update["description"] = updatedSneaker.Description
	}
	if updatedSneaker.Price > 0 {
		update["price"] = updatedSneaker.Price
	}
	if len(updatedSneaker.Tags) > 0 {
		update["tags"] = updatedSneaker.Tags
	}
	if updatedSneaker.SalesQuantity > 0 {
		update["salesQuantity"] = updatedSneaker.SalesQuantity
	}
	if updatedSneaker.PromotionCode != (primitive.ObjectID{}) {
		update["promotionCode"] = updatedSneaker.PromotionCode
	}
	update["lastDate"] = primitive.NewDateTimeFromTime(time.Now())

	return update
}

func AddColorToSneaker(sneakerID string, InsertedIDs []primitive.ObjectID) bool {
	if sneakerID != "" {
		id, err := primitive.ObjectIDFromHex(sneakerID)
		if err != nil {
			return false
		}

		_, err = database.SneakerCollection.UpdateOne(
			context.TODO(),
			bson.M{"_id": id},
			bson.M{"$push": bson.M{"colors": bson.M{"$each": InsertedIDs}}},
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
