package responses

import (
	"context"
	"product_management/app/database"
	"product_management/app/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func SendSneakerColorByID(c *fiber.Ctx) error {
	var sneakerColor models.SneakerColor

	id := c.Params("id")
	sneakerColorObjectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return err
	}
	

	err = database.SneakerColorsCollection.FindOne(context.TODO(), bson.M{"_id": sneakerColorObjectID}).Decode(&sneakerColor)

	if err != nil {
		return err
	}

	return c.JSON(sneakerColor)
}