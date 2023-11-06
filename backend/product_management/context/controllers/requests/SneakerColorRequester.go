package requests

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"product_management/app/database"
	"product_management/app/models"
	"product_management/context/repository"
	"product_management/context/utils"
)

func InsertSneakerColor(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Error when parsing the form")
	}
	sneakerID := c.Query("sneakerid")
	newSneakerColor, _, _ := utils.ParseValidSneakerColor(form)

	insertResult, err := repository.InsertOneSneakerColor(newSneakerColor)
	if err != nil {
		return c.Status(500).SendString("Error inserting the sneaker color")
	}

	insertedID, ok := insertResult.InsertedID.(primitive.ObjectID)

	if !ok {
		return c.Status(500).SendString("Error getting the sneaker id")
	}

	isRelated, _ := repository.AddColorsToSneaker(sneakerID, []models.SneakerColorData{{ID: insertedID, Color: form.Value["color"][0]}})
	if !isRelated {
		return c.Status(500).SendString("Error relating the sneaker colors to the main sneaker")
	}

	return c.JSON(struct {
		Message string             `json:"message"`
		ID      primitive.ObjectID `json:"id"`
	}{Message: "Successfully created sneaker color", ID: insertedID})
}

/*
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
} */

func UpdateSneakerColorById(c *fiber.Ctx) error {

	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Error when parsing the form")
	}
	colorId := c.Params("id")
	newSneakerColor, brand, deletedImagesIds := utils.ParseValidSneakerColor(form)
	updatedSneakerColor, wasUpdated, updateMessage := repository.UpdateSneakerData(colorId, newSneakerColor, deletedImagesIds, brand)

	if !wasUpdated {
		return c.Status(500).SendString(updateMessage)
	}

	update := validateUpdateData(updatedSneakerColor)
	wasUpdated, message := repository.UpdateSneakerColor(colorId, bson.M{"$set": update})
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
	wasUpdated, message := repository.UpdateSneakerColor(sneakerColorID, bson.M{
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
	if updatedSneakerColor.Quantity >= 0 {
		toUpdate["quantity"] = updatedSneakerColor.Quantity
	}

	return toUpdate
}

func DeleteSneakerColorById(c *fiber.Ctx) error {
	 sneakerID := c.Params("id")
	 sneakerColorID := c.Params("sneakerid")

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
		if success := repository.DeleteImageByPublicId(imageData.ID); !success {
			return c.Status(500).SendString("Error deleting images from Cloudinary")
		}
	}

	_, err = database.SneakerColorsCollection.DeleteOne(context.TODO(), bson.M{"_id": sneakerColorObjectID})
	if err != nil {
		return c.Status(500).SendString("Error during sneaker color deleting")
	}

	sneakerObjectId, err := primitive.ObjectIDFromHex(sneakerID)

	if err != nil {
		return c.Status(500).SendString("Invalid sneaker id")
	}
	repository.RemoveColorFromSneaker(sneakerObjectId, sneakerColorObjectID)

	return c.SendString("Sneaker color and associated sneakers successfully deleted")
}

func DeleteSneakerColorImage(c *fiber.Ctx) error {
	sneakerColorID := c.Params("id")

	imageID := c.Params("imageid")
	if imageID == "" {
		return c.Status(400).SendString("Invalid image id")
	}

	wasDeleted, message := repository.UpdateSneakerColor(sneakerColorID, bson.M{
		"$pull": bson.M{"images": bson.M{"id": imageID}},
	})

	if !wasDeleted {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}
