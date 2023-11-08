package utils

import (
	"ant-wood/product-management/app/models"
	"ant-wood/product-management/database"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetSneakerColors(documentID string) ([]primitive.ObjectID, error) {
	var sneaker models.Sneaker
	objectID, err := primitive.ObjectIDFromHex(documentID)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{Key: "_id", Value: objectID}}

	err = database.SneakersCollection().FindOne(context.TODO(), filter).Decode(&sneaker)

	if err != nil {
		return nil, err
	}
	var sneakerIdsColors  []primitive.ObjectID

	for _, sneakerColor := range sneaker.Colors {
		sneakerIdsColors = append(sneakerIdsColors, sneakerColor.ID)
	}

	return sneakerIdsColors, nil
}
