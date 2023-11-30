package requests

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"

	"product_management/app/database"
	"product_management/app/models"
	"product_management/context/controllers/responses"
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
	wasUpdated, message := updateSneakerById(sneakerID, bson.M{"$set": update})
	if !wasUpdated {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}

func AddColorsToSneaker(sneakerID string, InsertedIDs []primitive.ObjectID) (bool, string) {
	return updateSneakerById(
		sneakerID,
		bson.M{"$push": bson.M{"colors": bson.M{"$each": InsertedIDs}},
			"$set": bson.M{"lastDate": primitive.NewDateTimeFromTime(time.Now())}})
}

func UpdateLastDate(sneakerID string) (bool, string) {
	return updateSneakerById(
		sneakerID,
		bson.M{"$set": bson.M{"lastDate": primitive.NewDateTimeFromTime(time.Now())}})
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

func updateSneakerById(sneakerID string, toUpdate bson.M) (bool, string) {
	if sneakerID != "" {
		id, err := primitive.ObjectIDFromHex(sneakerID)
		if err != nil {
			return false, "Error getting the sneaker id"
		}
		_, err = database.SneakerCollection.UpdateOne(
			context.TODO(),
			bson.M{"_id": id},
			toUpdate,
		)

		if err != nil {
			return false, "Error updating the sneaker data"
		}

		return true, "Sneaker updated successfully"
	}

	return false, "Invalid sneaker id"

}

func DeleteSneakerById(c *fiber.Ctx) error {
	var id, _ = primitive.ObjectIDFromHex(c.Params("id"))
	_, err := database.SneakerCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	if err != nil {
		return c.Status(500).SendString("Error during sneaker deleting")
	}

	return c.SendString("Sneaker successfully deleted")
}

func RemoveSneakerColor(c *fiber.Ctx) error {
	sneakerID := c.Params("id")
	idColor := c.Params("idcolor")

	colorObjectID, err := primitive.ObjectIDFromHex(idColor)
	if err != nil {
		return c.Status(500).SendString("Invalid id color")
	}

	wasRemoved, message := removeColorFromSneaker(sneakerID, colorObjectID)
	if !wasRemoved {
		return c.Status(500).SendString(message)
	}

	return c.SendString(message)
}

func removeColorFromSneaker(sneakerID string, idColor primitive.ObjectID) (bool, string) {
	wasRemoved, _ := updateSneakerById(sneakerID, bson.M{
		"$pull": bson.M{"colors": idColor},
	})
	if !wasRemoved {
		return false, "Error removing color from Sneaker"
	}
	return true, "Color removed from Sneaker successfully"

}

func UpdateSneakerQuantities(c *fiber.Ctx) error {
	type SneakersQuantities struct {
		SneakerId      string  `json:"sneakerId,omitempty"`
		SneakerColorId string  `json:"sneakerColorId,omitempty"`
		Size           float32 `json:"size,omitempty"`
		Amount         int     `json:"amount,omitempty"`
	}

	var sneakers []SneakersQuantities
	if err := c.BodyParser(&sneakers); err != nil {
		return c.Status(400).SendString("Invalid sneaker data")
	}

	for _, sneaker := range sneakers {
		size := responses.GetQuantityBySize(sneaker.SneakerId, sneaker.SneakerColorId, sneaker.Size)

		if size < sneaker.Amount {
			return c.Status(400).SendString("Insufficient sneaker quantity")
		}

		sneakerObjId, err := primitive.ObjectIDFromHex(sneaker.SneakerId)

		if err != nil {
			return c.Status(500).SendString("Error getting the sneaker id")
		}

		sneakerColorIdObjId, err := primitive.ObjectIDFromHex(sneaker.SneakerColorId)

		if err != nil {
			return c.Status(500).SendString("Error getting the sneaker color id")
		}

		filter := bson.M{
			"_id":         sneakerColorIdObjId,
			"sizes.value": sneaker.Size,
		}
		update := bson.M{
			"$inc": bson.M{"sizes.$.quantity": -sneaker.Amount},
		}
		result, err := database.SneakerColorsCollection.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			return c.Status(500).SendString("Error updating sneaker quantity")
		}
		if result.ModifiedCount != 1 {
			return c.Status(500).SendString("Error updating sneaker quantity")
		}

		err = IncrementSalesQuantity(sneakerObjId)

		if err != nil {
			return c.Status(500).SendString("Error updating sneaker quantity")
		}
	}

	return c.JSON(sneakers)
}

func IncrementSalesQuantity(sneakerID primitive.ObjectID) error {
	filter := bson.M{"_id": sneakerID}
	update := bson.M{"$inc": bson.M{"salesQuantity": 1}}

	opts := options.Update().SetUpsert(false)
	_, err := database.SneakerCollection.UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		return err
	}

	return nil
}

func ConfirmAvailableSneakersQuantities(c *fiber.Ctx) error {
	type SneakersQuantities struct {
		SneakerId      string  `json:"sneakerId,omitempty"`
		SneakerColorId string  `json:"sneakerColorId,omitempty"`
		Size           float32 `json:"size,omitempty"`
		Amount         int     `json:"amount,omitempty"`
	}

	var sneakers []SneakersQuantities
	if err := c.BodyParser(&sneakers); err != nil {
		return c.Status(400).SendString("Invalid sneaker data")
	}

	for _, sneaker := range sneakers {
		size := responses.GetQuantityBySize(sneaker.SneakerId, sneaker.SneakerColorId, sneaker.Size)

		if size < sneaker.Amount {
			return c.Status(200).JSON(fiber.Map{
				"message":      "Insufficient sneaker quantity",
				"areAvailable": false,
			})
		}
	}

	return c.Status(200).JSON(fiber.Map{
		"message":      "Available",
		"areAvailable": true,
	})
}
