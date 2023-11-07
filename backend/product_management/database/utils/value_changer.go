package utils

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func UpdateSingleValue[T comparable](coll *mongo.Collection, documentID string, keyName string, newValue T) (interface{}, error) {
	objectID, err := primitive.ObjectIDFromHex(documentID)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{Key: "_id", Value: objectID}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: keyName, Value: newValue}}}}

	modifyNameResult, err := coll.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return modifyNameResult, nil
}

func InsertElementIntoArray[T comparable](coll *mongo.Collection, documentID string, arrayKeyName string, array []T, elementToAppend T) (interface{}, error) {
	objectID, err := primitive.ObjectIDFromHex(documentID)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{Key: "_id", Value: objectID}}
	array = append(array, elementToAppend)
	update := bson.D{{Key: "$set", Value: bson.D{{Key: arrayKeyName, Value: array}}}}
	insertIntoArrayResult, err := coll.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return insertIntoArrayResult, nil
}

func ChangeEntireDocument(coll *mongo.Collection, entityID primitive.ObjectID, newEntity interface{}) interface{} {
	filter := bson.D{{Key: "_id", Value: entityID}}

	changeEntireDocument := coll.FindOneAndReplace(context.TODO(), filter, newEntity)
	return changeEntireDocument
}
