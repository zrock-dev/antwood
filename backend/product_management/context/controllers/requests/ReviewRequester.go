package requests

import (
	"context"
	"product_management/app/database"
	"product_management/app/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func InsertReview(c *fiber.Ctx) error {
	var review *models.Review = models.DefaultReview()
	var sneaker *models.Sneaker

	sneakerId := c.Params("sneakerid")

	sneakerObjId, err := primitive.ObjectIDFromHex(sneakerId)

	if err != nil {
		return c.Status(500).SendString("Invalid sneaker id")
	}

	review.SneakerID = sneakerObjId

	if err := c.BodyParser(review); err != nil {
		return c.Status(400).SendString("Invalid review data")
	}

	rate := review.Rate

	err = validateReviewData(rate, review.Description)

	if err != nil {
		return c.Status(400).SendString(err.Error())
	}

	_, err = database.ReviewCollection.InsertOne(c.Context(), review)

	if err != nil {
		return c.Status(500).SendString("Error inserting review")
	}

	err = database.SneakerCollection.FindOne(c.Context(), bson.M{"_id": sneakerObjId}).Decode(&sneaker)
	if err != nil {
		return c.Status(500).SendString("Error finding sneaker")
	}

	if err != nil {
		return c.Status(500).SendString("Error inserting review")
	}

	updateRatingSummary(&sneaker.Reviews.RatingSummary, rate)
	sneaker.Reviews.Total += 1

	updateResult, err := database.SneakerCollection.UpdateOne(
		c.Context(),
		bson.M{"_id": sneakerObjId},
		bson.M{"$set": bson.M{"reviews": sneaker.Reviews}},
	)

	if err != nil || updateResult.MatchedCount == 0 {
		return c.Status(500).SendString("Error updating sneaker")
	}

	return c.Status(200).JSON(fiber.Map{
		"message":       "Review inserted successfully",
		"review":        review,
		"sneakerReview": sneaker.Reviews,
	})
}

func validateReviewData(rate int, description string) error {
	if rate < 1 || rate > 5 {
		return fiber.NewError(400, "Invalid rate")
	}

	if description == "" {
		return fiber.NewError(400, "Invalid description")
	}
	return nil
}

func updateRatingSummary(ratingSummary *models.RatingSummary, rate int) {
	switch rate {
	case 1:
		ratingSummary.Star1++
	case 2:
		ratingSummary.Star2++
	case 3:
		ratingSummary.Star3++
	case 4:
		ratingSummary.Star4++
	case 5:
		ratingSummary.Star5++
	}
}

func deleteReviewsBySneakerID(sneakerID string) error {
	id, err := primitive.ObjectIDFromHex(sneakerID)
	if err != nil {
		return err
	}

	_, err = database.ReviewCollection.DeleteMany(context.TODO(), bson.M{"sneakerId": id})
	if err != nil {
		return err
	}

	return nil
}
