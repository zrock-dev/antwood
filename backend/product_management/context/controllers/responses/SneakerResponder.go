package responses

import (
	"context"
	"strconv"

	"product_management/app/database"
	"product_management/app/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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



func SendRelatedProductsByTags(c *fiber.Ctx) error {
    const relatedProductsLimit = 10
	productID := c.Params("id")

	var currentProduct models.Sneaker
	objectID, err := primitive.ObjectIDFromHex(productID)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid product ID"})
	}

	filter := bson.D{{Key: "_id", Value: objectID}}
	err = database.SneakerCollection.FindOne(context.TODO(), filter).Decode(&currentProduct)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Product not found"})
	}

	var relatedProducts []models.Sneaker

	var tagsFilter []bson.E
    for _, tag := range currentProduct.Tags {
    	tagsFilter = append(tagsFilter, bson.E{"tags", bson.D{{"$in", tag}}})
    }

    filter = bson.D{
    	{"$or", tagsFilter},
    	{"_id", bson.D{{"$ne", currentProduct.ID}}},
    }

    options := options.Find().SetLimit(relatedProductsLimit)

	cursor, err := database.SneakerCollection.Find(context.TODO(), filter, options)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer cursor.Close(context.TODO())

	if !cursor.TryNext(context.TODO()) {
    	return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No related products were found."})
    }

	for cursor.Next(context.TODO()) {
		var product models.Sneaker
		if err := cursor.Decode(&product); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		}
		relatedProducts = append(relatedProducts, product)
	}

	if len(relatedProducts) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "No related products were found."})
	}

    var sneakersWithColor []models.SneakerWithColors
    var sneakerWithColor models.SneakerWithColors
    for _, relatedProduct := range relatedProducts  {
        id := int64(relatedProduct.ID.Timestamp())
        colorID := int64(relatedProduct.Colors[0].ID)
   		sneakerWithColor = getSeakerRelatedWithColor(strconv.Itoa(id), strconv.Itoa(colorID))
   		sneakersWithColor = append(sneakersWithColor, sneakerWithColor)
   	}

	return c.JSON(sneakersWithColor)
}

func getSeakerRelatedWithColor(sneakerId string, sneakerColorId string) models.SneakerWithColors {
	sneakerObjectID, err := primitive.ObjectIDFromHex(sneakerId)
	if err != nil {
		panic(err)
	}

	sneakerColorObjectID, err := primitive.ObjectIDFromHex(sneakerColorId)
	if err != nil {
		panic(err)

	}

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.D{{Key: "_id", Value: sneakerObjectID}}},
		},
		bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "sneakerColors"},
				{Key: "localField", Value: "colors._id"},
				{Key: "foreignField", Value: "_id"},
				{Key: "as", Value: "types"},
			}},
		},
		bson.D{
			{Key: "$project", Value: bson.D{
				{Key: "name", Value: 1},
				{Key: "price", Value: 1},
				{Key: "colors", Value: 1},
				{Key: "reviews", Value: 1},
				{Key: "lastDate", Value: 1},
				{Key: "salesQuantity", Value: 1},
				{Key: "promotionCode", Value: 1},
				{Key: "types", Value: bson.D{
					{Key: "$filter", Value: bson.D{
						{Key: "input", Value: "$types"},
						{Key: "as", Value: "type"},
						{Key: "cond", Value: bson.D{
							{Key: "$eq", Value: bson.A{"$$type._id", sneakerColorObjectID}},
						}},
					}},
				}},
			}},
		},
	}

	cursor, err := database.SneakerCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		panic(err)
	}
	defer cursor.Close(context.TODO())

	var sneakersWithColor models.SneakerWithColors
	for cursor.Next(context.TODO()) {
		if err := cursor.Decode(&sneakersWithColor); err != nil {
			panic(err)
		}
	}

	return sneakersWithColor
}

func SendColorRelatedProduct(c *fiber.Ctx) error {
	sneakerId := c.Params("sneakerId")
	sneakerColorId := c.Params("sneakerColorId")
	sneakersWithColor := getSeakerRelatedWithColor(sneakerId, sneakerColorId)

	return c.JSON(sneakersWithColor)
}

func SendColorRelatedProducts(c *fiber.Ctx) error {
	type SneakerIds struct {
		SneakerId      string `json:"sneakerId,omitempty"`
		SneakerColorId string `json:"sneakerColorId,omitempty"`
	}
	var data []SneakerIds
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).SendString("Invalid sneaker data")
	}

	var sneakersData []models.SneakerWithColors
	var sneakerWithColor models.SneakerWithColors
	for _, sneaker := range data {
		sneakerWithColor = getSeakerRelatedWithColor(sneaker.SneakerId, sneaker.SneakerColorId)
		sneakersData = append(sneakersData, sneakerWithColor)
	}

	return c.JSON(sneakersData)
}

