package responses

import (
	"context"
	"strconv"
	"fmt"

	"product_management/app/database"
	"product_management/app/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func SendSneakerByID(c *fiber.Ctx) error {
	var sneaker models.Sneaker
	requiredSneakerID := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(requiredSneakerID)
	if err != nil {
		return err
	}

	filter := bson.D{{Key: "_id", Value: objectID}}

	err = database.SneakerCollection.FindOne(context.TODO(), filter).Decode(&sneaker)

	if err != nil {
		return err
	}

	var sneakerWithColors models.SneakerWithColors
	sneakerWithColors.ID = sneaker.ID
	sneakerWithColors.Name = sneaker.Name
	sneakerWithColors.Brand = sneaker.Brand
	sneakerWithColors.Price = sneaker.Price
	sneakerWithColors.Description = sneaker.Description
	sneakerWithColors.LastDate = sneaker.LastDate
	sneakerWithColors.Qualification = sneaker.Qualification
	sneakerWithColors.SalesQuantity = sneaker.SalesQuantity
	sneakerWithColors.PromotionCode = sneaker.PromotionCode
	sneakerWithColors.Tags = sneaker.Tags
	sneakerWithColors.Reviews = sneaker.Reviews

	var colorTypes []models.SneakerColor
	for _, color := range sneaker.Colors {
		var colorS models.SneakerColor
		filter := bson.D{{Key: "_id", Value: color.ID}}
		err = database.SneakerColorsCollection.FindOne(context.TODO(), filter).Decode(&colorS)
		if err != nil {
			return err
		}
		colorTypes = append(colorTypes, colorS)
	}

	sneakerWithColors.Types = colorTypes
	return c.JSON(sneakerWithColors)
}

func SendSneakersByPagination(c *fiber.Ctx) error {
	page := c.Query("page", "1")
	pageSize := c.Query("pageSize", "9")
	pageInt, _ := strconv.Atoi(page)
	pageSizeInt, _ := strconv.Atoi(pageSize)

	skip := (pageInt - 1) * pageSizeInt
	limit := pageSizeInt

	pipeline := mongo.Pipeline{
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

func sendSneakerByBrand(c *fiber.Ctx) error {
    var sneaker models.Sneaker
    requiredSneakerBrand := c.Params("brand")
    objectBrand, err := String(requiredSneakerBrand)
    if err != nil {
   		return err
   	}

    filter := bson.D{{Key: "brand", Value: objectBrand}}

    err = database.SneakerCollection.FindOne(context.TODO(), filter).Decode(&sneaker)

    if err != nil {
   		return err
   	}

    	var sneakerWithColors models.SneakerWithColors
    	sneakerWithColors.ID = sneaker.ID
    	sneakerWithColors.Name = sneaker.Name
    	sneakerWithColors.Brand = sneaker.Brand
    	sneakerWithColors.Price = sneaker.Price
    	sneakerWithColors.Description = sneaker.Description
    	sneakerWithColors.LastDate = sneaker.LastDate
    	sneakerWithColors.Qualification = sneaker.Qualification
    	sneakerWithColors.SalesQuantity = sneaker.SalesQuantity
    	sneakerWithColors.PromotionCode = sneaker.PromotionCode
    	sneakerWithColors.Tags = sneaker.Tags
    	sneakerWithColors.Reviews = sneaker.Reviews

    	var colorTypes []models.SneakerColor
    	for _, color := range sneaker.Colors {
    		var colorS models.SneakerColor
    		filter := bson.D{{Key: "_id", Value: color.ID}}
    		err = database.SneakerColorsCollection.FindOne(context.TODO(), filter).Decode(&colorS)
    		if err != nil {
    			return err
    		}
    		colorTypes = append(colorTypes, colorS)
    	}

    	sneakerWithColors.Types = colorTypes
    	return c.JSON(sneakerWithColors)
}
