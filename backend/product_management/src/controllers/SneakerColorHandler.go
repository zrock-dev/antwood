package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"antwood_team/product_management/src/database"
	"antwood_team/product_management/src/models"
)

func InsertSneakerColor(c *fiber.Ctx) error {
	var newSneakerColor = models.DefaultSneakerColor()

	if err := c.BodyParser(newSneakerColor); err != nil {
		return c.Status(400).SendString("Invalid sneaker color data")
	}

	insertResult, err := database.SneakerColorsCollection.
		InsertOne(context.TODO(), newSneakerColor)
	if err != nil {
		return c.Status(500).SendString("Error inserting the sneaker color")
	}

	insertedID, ok := insertResult.InsertedID.(primitive.ObjectID)
	if !ok {
		return c.Status(500).SendString("Error getting the sneaker id")
	}

	return c.JSON(struct {
		Message string             `json:"message"`
		ID      primitive.ObjectID `json:"id"`
	}{Message: "Successfully created sneaker color", ID: insertedID})
}

func InsertManySneakerColors(c *fiber.Ctx) error {
	var sneakerColors []models.SneakerColor

	if err := c.BodyParser(&sneakerColors); err != nil {
		return c.Status(400).SendString("Invalid sneaker colors data")
	}

	var documents []interface{}

	for _, color := range sneakerColors {
		color.ID = primitive.NewObjectID()

		documents = append(documents, color)
	}

	insertResult, err := database.SneakerColorsCollection.InsertMany(context.TODO(), documents)
	if err != nil {
		return c.Status(500).SendString("Error inserting sneaker colors")
	}

	var insertedIDs []primitive.ObjectID
	for _, id := range insertResult.InsertedIDs {
		if objID, ok := id.(primitive.ObjectID); ok {
			insertedIDs = append(insertedIDs, objID)
		}
	}

	return c.JSON(struct {
		Message string               `json:"message"`
		IDs     []primitive.ObjectID `json:"ids"`
	}{Message: "Successfully created sneaker colors", IDs: insertedIDs})
}

func EditSneakerColorById(c *fiber.Ctx) error {
	return c.SendString("edit sneaker color " + c.Params("id"))
}

func DeleteSneakerColorById(c *fiber.Ctx) error {
	return c.SendString("delete sneaker color " + c.Params("id"))
}
