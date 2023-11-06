package requests

import (
	"context"
	"log"

	"product_management/app/database"
	"product_management/app/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Sneakercard struct {
	Sneaker      models.Sneaker      `json:"sneaker"`
	Sneakercolor models.SneakerColor `json:"sneakercolor"`
}

type Colors struct {
	ID    string `json:"id"`
	Color string `json:"color"`
}

func GetAllSneakers(c *fiber.Ctx) error {
	cursor, err := database.SneakerCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
		return err
	}

	defer cursor.Close(context.TODO())

	var sneakers []Sneakercard
	for cursor.Next(context.TODO()) {
		var sneaker models.Sneaker
		if err := cursor.Decode(&sneaker); err != nil {
			log.Fatal(err)
			return err
		}

		var sneakerColor models.SneakerColor
		if !(sneaker.Colors == nil) && !(len(sneaker.Colors) == 0) {
			if err := database.SneakerColorsCollection.FindOne(context.TODO(), bson.M{"_id": sneaker.Colors[0].ID}).Decode(&sneakerColor); err != nil {
				log.Printf("Error al obtener el SneakerColor: %v", err)
				continue
			}
			sne := Sneakercard{
				Sneaker:      sneaker,
				Sneakercolor: sneakerColor,
			}
			sneakers = append(sneakers, sne)

		} else {

			sne := Sneakercard{
				Sneaker:      sneaker,
				Sneakercolor: models.SneakerColor{},
			}
			sneakers = append(sneakers, sne)
		}
	}

	return c.JSON(sneakers)
}

func GetColorById(c *fiber.Ctx) error {
	id := c.Params("id")

	colorId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(500).SendString("Invalid id color")
	}
	var color models.SneakerColor
	err = database.SneakerColorsCollection.FindOne(context.TODO(), bson.M{"_id": colorId}).Decode(&color)
	if err != nil {
		return c.Status(500).SendString("Error finding sneaker color")
	}
	return c.JSON(color)
}

func DeleteSneakerColor(id primitive.ObjectID) bool {
	_, err := database.SneakerColorsCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err != nil
}

func DeleteSneaker(id primitive.ObjectID) bool {
	_, err := database.SneakerCollection.DeleteOne(context.TODO(), bson.M{"_id": id})
	return err != nil
}
