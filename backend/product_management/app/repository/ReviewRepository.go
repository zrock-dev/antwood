package repository

import (
	"context"
	"product_management/app/database"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)



func DeleteReviewsBySneakerID(sneakerId primitive.ObjectID) error {
	_, err := database.ReviewCollection.DeleteMany(context.TODO(), bson.M{"sneakerId": sneakerId})
	
	if err != nil {
		return err
	}

	return nil
}
