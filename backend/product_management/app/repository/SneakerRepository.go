package repository

import (
	"context"
	"product_management/app/database"
	"product_management/app/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func InsertColorToSneaker(sneakerID primitive.ObjectID, colorObject models.ColorObject) bool {
	update := bson.M{
		"$push": bson.M{"colors": colorObject},
		"$set":  bson.M{"lastDate": primitive.NewDateTimeFromTime(time.Now())},
	}

	_, err := database.SneakerCollection.UpdateOne(context.TODO(), bson.M{"_id": sneakerID}, update)
	return err == nil
}