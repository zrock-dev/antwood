package requests

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"product_management/app/database"
	"product_management/app/models"
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

	sneakerID := c.Query("sneakerid", "")
	if sneakerID != "" {
		isRelated, _ := AddColorsToSneaker(sneakerID, []primitive.ObjectID{insertedID})
		if !isRelated {
			return c.Status(500).SendString("Error relating the sneaker colors to the main sneaker")
		}
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

	sneakerID := c.Query("sneakerid", "")
	if sneakerID != "" {
		wasInserted, _ := AddColorsToSneaker(sneakerID, insertedIDs)
		if !wasInserted {
			return c.Status(500).SendString("Error relating the sneaker colors to the main sneaker")
		}
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
	if len(updatedSneakerColor.Images) > 0 {
		toUpdate["images"] = updatedSneakerColor.Images
	}
	if len(updatedSneakerColor.Sizes) > 0 {
		toUpdate["sizes"] = updatedSneakerColor.Sizes
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
	sneakerColorID := c.Params("id")
	sneakerColorObjectID, err := primitive.ObjectIDFromHex(sneakerColorID)
	if err != nil {
		return c.Status(400).SendString("Invalid sneaker color ID")
	}

	var sneakerColor models.SneakerColor
	err = database.SneakerColorsCollection.FindOne(context.TODO(), bson.M{"_id": sneakerColorObjectID}).Decode(&sneakerColor)
	if err != nil {
		return c.Status(500).SendString("Error finding sneaker color")
	}

	for _, imageData := range sneakerColor.Images {
		if success := DeleteImageById(imageData.ID); !success {
			return c.Status(500).SendString("Error deleting images from Cloudinary")
		}
	}

	filter := bson.M{"colors": sneakerColorObjectID}
	cur, err := database.SneakerCollection.Find(context.TODO(), filter)
	if err != nil {
		return c.Status(500).SendString("Error finding sneakers with this sneaker color")
	}
	defer cur.Close(context.TODO())
	var sneakerIDs []primitive.ObjectID
	for cur.Next(context.TODO()) {
		var sneaker models.Sneaker
		if err := cur.Decode(&sneaker); err != nil {
			return c.Status(500).SendString("Error decoding sneaker")
		}
		sneakerIDs = append(sneakerIDs, sneaker.ID)
	}

	_, err = database.SneakerColorsCollection.DeleteOne(context.TODO(), bson.M{"_id": sneakerColorObjectID})
	if err != nil {
		return c.Status(500).SendString("Error during sneaker color deleting")
	}

	for _, sneakerID := range sneakerIDs {
		removeColorFromSneaker(sneakerID.Hex(), sneakerColorObjectID)
	}

	return c.SendString("Sneaker color and associated sneakers successfully deleted")
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
