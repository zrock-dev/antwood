package responses

import (
	"context"
	"product_management/app/database"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type filters struct {
	Brands   []string  `json:"brands"`
	Colors   []string  `json:"colors"`
	MaxPrice float32   `json:"maxPrice"`
	MinPrice float32   `json:"minPrice"`
	Sizes    []float32 `json:"sizes"`
	Tags     []string  `json:"tags"`
}

func SendSneakersFiltersOptions(c *fiber.Ctx) error {
	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "sneakerColors"},
				{Key: "localField", Value: "colors._id"},
				{Key: "foreignField", Value: "_id"},
				{Key: "as", Value: "types"},
			}},
		},
		bson.D{
			{Key: "$unwind", Value: "$colors"},
		},
		bson.D{
			{Key: "$unwind", Value: "$tags"},
		},
		bson.D{
			{Key: "$unwind", Value: "$types"},
		},
		bson.D{
			{Key: "$unwind", Value: "$types.sizes"},
		},
		bson.D{
			{Key: "$group", Value: bson.D{
				{Key: "_id", Value: "null"},
				{Key: "minPrice", Value: bson.D{{Key: "$min", Value: "$price"}}},
				{Key: "maxPrice", Value: bson.D{{Key: "$max", Value: "$price"}}},
				{Key: "colors", Value: bson.D{
					{Key: "$addToSet", Value: "$colors.color"},
				}},
				{Key: "tags", Value: bson.D{
					{Key: "$addToSet", Value: "$tags"},
				}},
				{Key: "brands", Value: bson.D{
					{Key: "$addToSet", Value: "$brand"},
				}},
				{Key: "sizes", Value: bson.D{
					{Key: "$addToSet", Value: "$types.sizes.value"},
				}},
			}},
		},
	}

	cursor, err := database.SneakerCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}
	defer cursor.Close(context.TODO())

	var filters filters
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&filters); err != nil {
			return c.Status(500).SendString(err.Error())
		}
	}

	return c.JSON(filters)
}

func SendSneakersFilteredByPagination(c *fiber.Ctx) error {
	return c.SendString("filters")
}
