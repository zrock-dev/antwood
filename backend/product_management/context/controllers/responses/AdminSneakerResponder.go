package responses

import (
	"context"
	"product_management/app/database"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type sneakerAvgQuantity struct {
	AvgQuantity float64 `json:"avgQuantity"`
	Color       string  `json:"color"`
}

func SendSneakerAvgQuantity(c *fiber.Ctx) error {
	sneakerId := c.Params("id")
	id, err := primitive.ObjectIDFromHex(sneakerId)
	if err != nil {
		return err
	}

	pipeline := mongo.Pipeline{
		{{Key: "$match", Value: bson.D{{Key: "_id", Value: id}}}},
		{{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "sneakerColors"},
			{Key: "localField", Value: "colors._id"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "types"},
		}}},
		{{Key: "$addFields", Value: bson.D{
			{Key: "types", Value: bson.D{
				{Key: "$map", Value: bson.D{
					{Key: "input", Value: "$types"},
					{Key: "as", Value: "type"},
					{Key: "in", Value: bson.D{
						{Key: "$mergeObjects", Value: bson.A{
							"$$type",
							bson.D{
								{Key: "$arrayElemAt", Value: bson.A{
									bson.D{
										{Key: "$filter", Value: bson.D{
											{Key: "input", Value: "$colors"},
											{Key: "as", Value: "color"},
											{Key: "cond", Value: bson.D{
												{Key: "$eq", Value: bson.A{
													"$$color._id",
													"$$type._id",
												}},
											}},
										}},
									},
									0,
								}},
							},
						}},
					}},
				}},
			}},
		}}},
		{{Key: "$unwind", Value: "$types"}},
		{{Key: "$unwind", Value: "$types.sizes"}},
		{{Key: "$group", Value: bson.D{
			{Key: "_id", Value: "$types._id"},
			{Key: "color", Value: bson.D{{Key: "$first", Value: "$types.color"}}},
			{Key: "avgQuantity", Value: bson.D{{Key: "$avg", Value: "$types.sizes.quantity"}}},
		}}},
	}

	cursor, err := database.SneakerCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return c.Status(500).SendString(err.Error())
	}

	defer cursor.Close(context.TODO())

	var sneakerQuantities []sneakerAvgQuantity = []sneakerAvgQuantity{}
	var currentSneaker sneakerAvgQuantity
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&currentSneaker); err != nil {
			return c.Status(500).SendString(err.Error())
		}
		sneakerQuantities = append(sneakerQuantities, currentSneaker)
	}

	return c.JSON(sneakerQuantities)
}
