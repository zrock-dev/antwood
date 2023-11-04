package requests

import (
	"context"
	"log"

	"product_management/app/database"
	"product_management/app/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

type Shoecard struct {
	Shoe         models.Sneaker      "json:shoe"
	Sneakercolor models.SneakerColor "json:sneakercolor"
}

type Colors struct {
	id    string "json:id"
	color string "json:color"
}

func GetAllSneakers(c *fiber.Ctx) error {
	cursor, err := database.SneakerCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
		return err
	}

	defer cursor.Close(context.TODO())

	var sneakers []Shoecard

	for cursor.Next(context.TODO()) {
		var sneaker models.Sneaker
		if err := cursor.Decode(&sneaker); err != nil {
			log.Fatal(err)
			return err
		}

		var sneakerColor models.SneakerColor
		if !(sneaker.Colors == nil) && !(len(sneaker.Colors) == 0) {
			if err := database.SneakerColorsCollection.FindOne(context.TODO(), bson.M{"_id": sneaker.Colors[0]}).Decode(&sneakerColor); err != nil {
				log.Printf("Error al obtener el SneakerColor: %v", err)
				continue
			}
			sne := Shoecard{
				Shoe:         sneaker,
				Sneakercolor: sneakerColor,
			}

			sneakers = append(sneakers, sne)
		}
	}

	return c.JSON(sneakers)
}