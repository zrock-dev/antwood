package responses

import (
	"context"
	"product_management/app/database"
	"strconv"

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
	page := c.Query("page", "1")
	pageSize := c.Query("pageSize", "9")
	pageInt, _ := strconv.Atoi(page)
	pageSizeInt, _ := strconv.Atoi(pageSize)

	skip := (pageInt - 1) * pageSizeInt
	limit := pageSizeInt

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "$and", Value: []interface{}{
					bson.D{{Key: "brand", Value: "converse"}},
					bson.D{{Key: "tags", Value: bson.D{{Key: "$in", Value: []string{"women"}}}}},
					bson.D{{Key: "colors", Value: bson.D{{Key: "$elemMatch", Value: bson.D{{Key: "color", Value: bson.D{{Key: "$in", Value: []string{"black"}}}}}}}}}},
				},
			},
			}},
		bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "$and", Value: []interface{}{
					bson.D{{Key: "price", Value: bson.D{{Key: "$lte", Value: 200}}}},
					bson.D{{Key: "price", Value: bson.D{{Key: "$gte", Value: 200}}}},
				}},
			},
			},
		},
		bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "sneakerColors"},
				{Key: "localField", Value: "colors.0._id"},
				{Key: "foreignField", Value: "_id"},
				{Key: "as", Value: "types"},
			}},
		},
		bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "types.sizes", Value: bson.D{
					{Key: "$elemMatch", Value: bson.D{
						{Key: "value", Value: bson.D{
							{Key: "$in", Value: []float32{12}},
						}},
					}},
				}},
			},
			},
		},
		bson.D{
			{Key: "$skip", Value: skip},
		},
		bson.D{
			{Key: "$limit", Value: limit},
		},
		bson.D{
			{Key: "$project", Value: bson.D{
				{Key: "tags", Value: 0},
				{Key: "qualification", Value: 0},
				{Key: "description", Value: 0},
				{Key: "reviews", Value: 0},
				{Key: "brand", Value: 0},
				{Key: "types.sizes", Value: 0},
				{Key: "types.quantity", Value: 0},
			}},
		},
	}

	return sendSneakersUsingPipeline(pipeline, c)
}
