package requests

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"product_management/app/database"
	"product_management/app/models"
	"product_management/app/repository"
)



func InsertSneakerColor(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Error when parsing the form")
	}
	sneakerID := c.Query("sneakerid")

	sneakerObjId, err := primitive.ObjectIDFromHex(sneakerID)
	if err != nil {
		return c.Status(500).SendString("Invalid sneaker ID")
	}

	newSneakerColor, _, _ := ParseValidSneakerColor(form)

	insertResult, err := repository.InsertOneSneakerColor(newSneakerColor)
	if err != nil {
		return c.Status(500).SendString("Error inserting the sneaker color")
	}

	insertedID, ok := insertResult.InsertedID.(primitive.ObjectID)

	if !ok {
		return c.Status(500).SendString("Error getting the sneaker id")
	}

	isInserted := repository.InsertColorToSneaker(sneakerObjId, models.ColorObject{
		ID:    insertedID,Color : form.Value["color"][0]})
	
	if !isInserted {
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

	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Error when parsing the form")
	}
	
	newSneakerColor, _, deletedImages := ParseValidSneakerColor(form)
	updatedSneakerColor , wasUpdated, message := repository.UpdateSneakerColorData(sneakerColorID, newSneakerColor, deletedImages)
	

    if !wasUpdated {
		return c.Status(500).SendString(message)
	}

	return c.JSON(struct {
		Message string             `json:"message"`
		SneakerColor      models.SneakerColor `json:"updatedSneakerColor"`
	}{Message: message, SneakerColor : updatedSneakerColor})

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
		if success := repository.DeleteImageByPublicId(imageData.ID); !success {
			return c.Status(500).SendString("Error deleting images from Cloudinary")
		}
	}

	filter := bson.M{"colors": bson.M{"$elemMatch": bson.M{"_id": sneakerColorObjectID}}}

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


