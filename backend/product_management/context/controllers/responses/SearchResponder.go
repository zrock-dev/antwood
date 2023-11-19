package responses

import (
	"context"
	"strconv"

	"product_management/app/database"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type searchSuggestions struct {
	Names []string `json:"names"`
}

func SendSearchSuggestions(c *fiber.Ctx) error {
	var searchInput = c.Query("input", "")
	var limitSuggestions = c.Query("limit", "10")
	if searchInput != "" {
		limit, _ := strconv.Atoi(limitSuggestions)
		pipeline := mongo.Pipeline{
			{
				{Key: "$match", Value: bson.D{
					{Key: "name", Value: primitive.Regex{Pattern: searchInput, Options: "i"}},
				}},
			},
			{
				{
					Key: "$limit", Value: limit,
				},
			},
			{
				{Key: "$group", Value: bson.D{
					{Key: "_id", Value: nil},
					{Key: "names", Value: bson.D{{Key: "$push", Value: "$name"}}},
				}},
			},
			{
				{Key: "$project", Value: bson.D{
					{Key: "_id", Value: 0},
				}},
			},
		}

		cursor, err := database.SneakerCollection.Aggregate(context.TODO(), pipeline)
		if err != nil {
			return c.Status(500).SendString(err.Error())
		}
		defer cursor.Close(context.TODO())

		var suggestionResult []searchSuggestions
		var suggestion searchSuggestions
		for cursor.Next(context.TODO()) {
			if err := cursor.Decode(&suggestion); err != nil {
				return c.Status(500).SendString(err.Error())
			}
			suggestionResult = append(suggestionResult, suggestion)
		}

		return c.JSON(suggestionResult[0])
	}
	return c.JSON([]string{})

}
