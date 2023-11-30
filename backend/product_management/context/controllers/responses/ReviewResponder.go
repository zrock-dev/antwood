package responses

import (
	"context"
	"product_management/app/database"
	"product_management/app/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)
func SendReviewsByIndex(c *fiber.Ctx) error {
	sneakerID := c.Params("sneakerid")
	index := c.Query("index")
	amount := c.Query("amount")

	
	sneakerIDObjID, err := primitive.ObjectIDFromHex(sneakerID)
	if err != nil {
		return c.Status(500).SendString("Invalid sneaker ID")
	}

	amountInt, err := strconv.Atoi(amount)
	if err != nil || amountInt <= 0 || amountInt > 1000 {
		return c.Status(400).SendString("Invalid amount")
	}

	indexInt, err := strconv.Atoi(index)
	if err != nil || indexInt < 0 || indexInt > 1000 {
		return c.Status(400).SendString("Invalid index")
	}

	filter := bson.M{
		"sneakerId": sneakerIDObjID,
	}

	options := options.Find()
	options.SetSort(bson.M{"reviewDate": -1})

	reviews, err := database.ReviewCollection.Find(
		context.TODO(),
		filter,
		options.SetSkip(int64(indexInt)).SetLimit(int64(amountInt)),
	)
	if err != nil {
		return c.Status(500).SendString("Error while querying reviews")
	}

	resultReviews := []models.Review{}
	if err := reviews.All(context.TODO(), &resultReviews); err != nil {
		return c.Status(500).SendString("Error while processing reviews")
	}

	currentSneaker := models.Sneaker{}
	err = database.SneakerCollection.FindOne(context.TODO(), bson.M{"_id": sneakerIDObjID}).Decode(&currentSneaker)

	if err != nil {
		return c.Status(500).SendString("Error while querying sneaker")
	}

	return c.JSON(fiber.Map{
		"reviews": resultReviews,
		"summaryUpdate":   currentSneaker.Reviews,
	})
}



func SendReviewsByUserEmail(c *fiber.Ctx) error {
	sneakerID := c.Params("sneakerid")
	userEmail := c.Params("useremail")
	


	sneakerIDObjID, err := primitive.ObjectIDFromHex(sneakerID)
	if err != nil {
		return c.Status(500).SendString("Invalid sneaker ID")
	}

	filter := bson.M{
		"sneakerId": sneakerIDObjID,
		"userEmail":  userEmail,
	}

	reviews, err := database.ReviewCollection.Find(
		context.TODO(),
		filter)

	if err != nil {
		return c.Status(500).SendString("Error while querying reviews")
	}

	resultReviews := []models.Review{}
	if err := reviews.All(context.TODO(), &resultReviews); err != nil {
		return c.Status(500).SendString("Error while processing reviews")
	}
	
	return c.JSON(resultReviews)
}