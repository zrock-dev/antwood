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
	isRelated, _ := AddColorsToSneaker(sneakerID, []primitive.ObjectID{insertedID})
	if !isRelated {
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
		if objectID, ok := id.(primitive.ObjectID); ok {
			insertedIDs = append(insertedIDs, objectID)
		}
	}

	sneakerID := c.Query("sneakerid")
	wasInserted, _ := AddColorsToSneaker(sneakerID, insertedIDs)
	if !wasInserted {
		return c.Status(500).SendString("Error relating the sneaker colors to the main sneaker")
	}

	return c.JSON(struct {
		Message string               `json:"message"`
		IDs     []primitive.ObjectID `json:"ids"`
	}{Message: "Successfully created sneaker colors", IDs: insertedIDs})
}

func UpdateSneakerColorById(c *fiber.Ctx) error {
	sneakerColorID := c.Params("id")

	var updatedSneakerColor models.SneakerColor
	if err := c.BodyParser(&updatedSneakerColor); err != nil {
		return c.Status(400).SendString("Invalid update data")
	}

	update := validateUpdateData(updatedSneakerColor)
	wasUpdated, message := updateSneakerColor(sneakerColorID, bson.M{"$set": update})

	if !wasUpdated {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}

func AddNewImageToSneakerColor(c *fiber.Ctx) error {
	sneakerColorID := c.Params("id")
	newImageData := new(models.ImageData)

	if err := c.BodyParser(newImageData); err != nil {
		return c.Status(400).SendString("Invalid image data")
	}
	wasUpdated, message := updateSneakerColor(sneakerColorID, bson.M{
		"$push": bson.M{"images": newImageData}})
	if !wasUpdated {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}

func validateUpdateData(updatedSneakerColor models.SneakerColor) bson.M {
	toUpdate := bson.M{}
	if updatedSneakerColor.Color != "" {
		toUpdate["color"] = updatedSneakerColor.Color
	}
	if len(updatedSneakerColor.Images) > 0 {
		toUpdate["images"] = updatedSneakerColor.Images
	}
	if len(updatedSneakerColor.Sizes) > 0 {
		toUpdate["sizes"] = updatedSneakerColor.Sizes
	}
	if updatedSneakerColor.Quantity >= 0 {
		toUpdate["quantity"] = updatedSneakerColor.Quantity
	}

	return toUpdate
}

func updateSneakerColor(sneakerColorId string, toUpdate bson.M) (bool, string) {
	if sneakerColorId != "" {
		id, err := primitive.ObjectIDFromHex(sneakerColorId)
		if err != nil {
			return false, "Error getting the sneaker color id"
		}

		_, err = database.SneakerColorsCollection.UpdateOne(
			context.TODO(),
			bson.M{"_id": id},
			toUpdate,
		)

		if err != nil {
			return false, "Error updating the sneaker color"
		}

		return true, "Sneaker updated successfully"
	}

	return false, "Invalid sneaker id"
}

func DeleteSneakerColorById(c *fiber.Ctx) error {
	var id, _ = primitive.ObjectIDFromHex(c.Params("id"))
	_, err := database.SneakerColorsCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	if err != nil {
		return c.Status(500).SendString("Error during sneaker color deleting")
	}

	return c.SendString("Sneaker color successfully deleted")
}

func DeleteSneakerColorImage(c *fiber.Ctx) error {
	sneakerColorID := c.Params("id")

	imageID := c.Params("imageid")
	if imageID == "" {
		return c.Status(400).SendString("Invalid image id")
	}

	wasDeleted, message := updateSneakerColor(sneakerColorID, bson.M{
		"$pull": bson.M{"images": bson.M{"id": imageID}},
	})

	if !wasDeleted {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}
