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
	id := c.Params("id")
	return c.SendString("edit sneaker " + id)
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
	id := c.Params("id")
	return c.SendString("delete sneaker " + id)
}
