package responses

import (
	"context"
	"net/url"
	"strconv"
	"strings"

	"product_management/app/database"
	"product_management/app/models"

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

		if len(suggestionResult) > 0 {
			return c.JSON(suggestionResult[0])
		}
		return c.JSON([]string{})

	}
	return c.JSON([]string{})
}

func SendSneakersSearchedByPagination(c *fiber.Ctx) error {
	searchInput := c.Params("input", "")
	page := c.Query("page", "1")
	pageSize := c.Query("pageSize", "9")
	pageInt, _ := strconv.Atoi(page)
	pageSizeInt, _ := strconv.Atoi(pageSize)

	skip := (pageInt - 1) * pageSizeInt
	limit := pageSizeInt

	searchInput = strings.TrimSpace(searchInput)
	searchInput, err := url.QueryUnescape(searchInput)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "name", Value: bson.D{
					{Key: "$regex", Value: primitive.Regex{Pattern: searchInput, Options: "i"}},
				}},
			}},
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
			{Key: "$skip", Value: skip},
		},
		bson.D{
			{Key: "$limit", Value: limit},
		},
		bson.D{
			{Key: "$project", Value: bson.D{
				{Key: "name", Value: 0},
				{Key: "qualification", Value: 0},
				{Key: "description", Value: 0},
				{Key: "reviews", Value: 0},
				{Key: "brand", Value: 0},
				{Key: "types.sizes", Value: 0},
				{Key: "types.quantity", Value: 0},
			}},
		},
	}

	cursor, err := database.SneakerCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer cursor.Close(context.TODO())

	var sneakersWithColors []models.SneakerWithColors
	for cursor.Next(context.TODO()) {
		var sneakerWithColors models.SneakerWithColors
		if err := cursor.Decode(&sneakerWithColors); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		sneakersWithColors = append(sneakersWithColors, sneakerWithColors)
	}

	if len(sneakersWithColors) == 0 {
		sneakersWithColors = []models.SneakerWithColors{}
	}

	return c.JSON(struct {
		Sneakers []models.SneakerWithColors `json:"sneakers"`
		Page     int                        `json:"page"`
	}{
		Sneakers: sneakersWithColors,
		Page:     pageInt,
	})
}
