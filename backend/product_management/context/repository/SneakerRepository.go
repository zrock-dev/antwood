package repository

import (
	"context"
	"log"
	"product_management/app/database"
	"product_management/app/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func FindSneaker(sneakerId primitive.ObjectID) (bool, models.Sneaker) {
	var sneaker models.Sneaker
	err := database.SneakerCollection.FindOne(context.TODO(), bson.M{"_id": sneakerId}).Decode(&sneaker)
	if err != nil {
		log.Fatal(err)
		return false, sneaker
	}
	return true, sneaker
}

func DeleteSneakerById(sneakerId primitive.ObjectID) bool {
	_, err := database.SneakerCollection.DeleteOne(context.TODO(), bson.M{"_id": sneakerId})
	if err != nil {
		log.Fatal(err)
		return false
	}
	return true
}

func InsertOneSneaker(sneaker models.Sneaker) (*mongo.InsertOneResult, error) {
	insertResult, err := database.SneakerCollection.
		InsertOne(context.TODO(), sneaker)
	return insertResult, err
}

func UpdateSneakerById(sneakerID string, toUpdate bson.M) (bool, string) {
	if sneakerID != "" {
		id, err := primitive.ObjectIDFromHex(sneakerID)
		if err != nil {
			return false, "Error getting the sneaker id"
		}
		_, err = database.SneakerCollection.UpdateOne(
			context.TODO(),
			bson.M{"_id": id},
			toUpdate,
		)

		if err != nil {
			return false, "Error updating the sneaker data"
		}

		return true, "Sneaker updated successfully"
	}

	return false, "Invalid sneaker id"
}

func AddColorsToSneaker(sneakerID string, insertedColors []models.SneakerColorData) (bool, string) {
	return UpdateSneakerById(
		sneakerID,
		bson.M{"$push": bson.M{"colors": bson.M{"$each": insertedColors}},
			"$set": bson.M{"lastDate": primitive.NewDateTimeFromTime(time.Now())}})
}

func UpdateLastDate(sneakerID string) (bool, string) {
	return UpdateSneakerById(
		sneakerID,
		bson.M{"$set": bson.M{"lastDate": primitive.NewDateTimeFromTime(time.Now())}})
}

func RemoveColorFromSneaker(sneakerID primitive.ObjectID, idColor primitive.ObjectID) (bool, string) {
	filter := bson.M{"_id": sneakerID, "colors._id": idColor}
	update := bson.M{"$pull": bson.M{"colors": bson.M{"_id": idColor}}}

	_, err := database.SneakerCollection.UpdateOne(
		context.TODO(),
		filter,
		update,
	)

	if err != nil {
		return false, "Error removing color from sneaker"
	} else {
		return true, "Color removed from sneaker successfully"
	}
}
