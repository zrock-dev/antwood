package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
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

	sneakerID := c.Query("sneakerid")
	wasInserted := AddColorToSneaker(sneakerID, []primitive.ObjectID{insertedID})
	if !wasInserted {
		return c.Status(500).SendString("Error relating the sneaker colors to the main sneaker")
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

	sneakerID := c.Query("sneakerid")
	wasInserted := AddColorToSneaker(sneakerID, insertedIDs)
	if !wasInserted {
		return c.Status(500).SendString("Error relating the sneaker colors to the main sneaker")
	}

	return c.JSON(struct {
		Message string               `json:"message"`
		IDs     []primitive.ObjectID `json:"ids"`
	}{Message: "Successfully created sneaker colors", IDs: insertedIDs})
}

func EditSneakerColorById(c *fiber.Ctx) error {
	sneakerColorID := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(sneakerColorID)
	if err != nil {
		return c.Status(400).SendString("Invalid SneakerColor ID")
	}

	update := bson.M{}
	var updatedSneakerColor models.SneakerColor
	if err := c.BodyParser(&updatedSneakerColor); err != nil {
		return c.Status(400).SendString("Invalid update data")
	}

	update = validateSneakerColorDate(updatedSneakerColor, update)
	result, err := database.SneakerColorsCollection.UpdateOne(
		context.TODO(),
		bson.M{"_id": objectID},
		bson.M{"$set": update},
	)

	if err != nil {
		return c.Status(500).SendString("Error updating SneakerColor")
	}

	if result.ModifiedCount == 0 {
		return c.Status(404).SendString("SneakerColor not found")
	}

	return c.SendString("SneakerColor updated successfully")
}

func validateSneakerColorDate(updatedSneakerColor models.SneakerColor, update bson.M) bson.M {
	if len(updatedSneakerColor.Images) > 0 {
		update["images"] = updatedSneakerColor.Images
	}
	if len(updatedSneakerColor.Sizes) > 0 {
		update["sizes"] = updatedSneakerColor.Sizes
	}
	if updatedSneakerColor.Quantity >= 0 {
		update["quantity"] = updatedSneakerColor.Quantity
	}

	return update
}

func DeleteSneakerColorById(c *fiber.Ctx) error {
	var id, _ = primitive.ObjectIDFromHex(c.Params("id"))
	_, err := database.SneakerColorsCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	if err != nil {
		return c.Status(500).SendString("Error during sneaker color deleting")
	}

	return c.SendString("Sneaker color successfully deleted")
}
