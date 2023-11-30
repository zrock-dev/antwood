package responses

import (
	"context"
	"product_management/app/database"
	"strconv"
	"strings"

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

func getFilterOptions(c *fiber.Ctx) (string, string, []string, float32, float32, float32) {
	brand := c.Query("brand", "")
	color := c.Query("color", "")

	tagsEntry := c.Query("tags", "")
	minPriceEntry := c.Query("minPrice", "0")
	maxPriceEntry := c.Query("maxPrice", "0")
	sizeEntry := c.Query("size", "0")
	minPrice, _ := strconv.ParseFloat(minPriceEntry, 32)
	maxPrice, _ := strconv.ParseFloat(maxPriceEntry, 32)
	size, _ := strconv.ParseFloat(sizeEntry, 32)

	tags := strings.Split(tagsEntry, ",")
	return brand, color, tags, float32(minPrice), float32(maxPrice), float32(size)
}

func SendSneakersFilteredByPagination(c *fiber.Ctx) error {
	skip, limit := getPaginationValues(c)
	sortField, sortOrder := getSortValues(c)
	brand, color, tags, minPrice, maxPrice, size := getFilterOptions(c)

	if brand != "" || (tags[0] != "" && len(tags) > 0) || color != "" ||
		(minPrice > 0 && maxPrice > 0) || size > 0 {
		pipeline := mongo.Pipeline{}
		pipeline = getMatchFilters(pipeline, brand, tags, color)
		pipeline = getPriceFilter(pipeline, minPrice, maxPrice)
		pipeline = append(pipeline, bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "sneakerColors"},
				{Key: "localField", Value: "colors.0._id"},
				{Key: "foreignField", Value: "_id"},
				{Key: "as", Value: "types"},
			}},
		})
		pipeline = getSizeFilter(pipeline, size)
		pipeline = append(pipeline,
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
			})

		pipeline = addSortToPipeline(pipeline, sortField, sortOrder)

		return sendSneakersUsingPipeline(pipeline, c)
	}

	return c.JSON(fiber.Map{
		"sneakers": []string{},
	})

}

func getMatchFilters(pipeline mongo.Pipeline, brand string, tags []string, color string) mongo.Pipeline {
	if brand != "" || (tags[0] != "" && len(tags) > 0) || color != "" {
		andMatch := []interface{}{}
		if brand != "" {
			andMatch = append(andMatch, bson.D{{Key: "brand", Value: brand}})
		}
		if tags[0] != "" && len(tags) > 0 {
			andMatch = append(andMatch, bson.D{{Key: "tags", Value: bson.D{{Key: "$all", Value: tags}}}})
		}
		if color != "" {
			andMatch = append(andMatch, bson.D{{Key: "colors", Value: bson.D{{Key: "$elemMatch", Value: bson.D{{Key: "color", Value: bson.D{{Key: "$in", Value: []string{color}}}}}}}}})
		}

		pipeline = append(pipeline, bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "$and", Value: andMatch},
			}},
		})
	}
	return pipeline
}

func getPriceFilter(pipeline mongo.Pipeline, minPrice float32, maxPrice float32) mongo.Pipeline {
	if minPrice > 0 && maxPrice > 0 {
		pipeline = append(pipeline, bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "$and", Value: []interface{}{
					bson.D{{Key: "price", Value: bson.D{{Key: "$lte", Value: maxPrice}}}},
					bson.D{{Key: "price", Value: bson.D{{Key: "$gte", Value: minPrice}}}},
				}},
			},
			},
		})
	}
	return pipeline
}

func getSizeFilter(pipeline mongo.Pipeline, size float32) mongo.Pipeline {
	if size > 0 {
		pipeline = append(pipeline, bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "types.sizes", Value: bson.D{
					{Key: "$elemMatch", Value: bson.D{
						{Key: "value", Value: bson.D{
							{Key: "$in", Value: []float32{size}},
						}},
					}},
				}},
			},
			},
		})
	}

	return pipeline
}
