package utils

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func DeleteDocumentFromCollection(coll *mongo.Collection, documentID string) (interface{}, error) {
	objectID, err := primitive.ObjectIDFromHex(documentID)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{Key: "_id", Value: objectID}}

	deleteResult := coll.FindOneAndDelete(context.TODO(), filter)
	return deleteResult, err
}
