package handlers

import (
	"ant-wood/product-management/app/models"
	"ant-wood/product-management/database"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func getSneakerColorsCollection()  *mongo.Collection {
	return database.SneakerColorsCollection()
}


func DeleteSneakerColorById(sneakerColorId primitive.ObjectID) (interface{},error) {
	deletionResult, err := getSneakerColorsCollection().DeleteOne(context.TODO(), bson.M{"_id": sneakerColorId})
	if err != nil {
		return nil,err
	}
	return deletionResult,nil
}


func FindShoeColorById(sneakerColorId primitive.ObjectID) (bool, models.SneackerColor) {
	var sneakerColor models.SneackerColor
	err := getSneakerColorsCollection().FindOne(context.TODO(), bson.M{"_id": sneakerColorId}).Decode(&sneakerColor)
	if err != nil {
		return false, models.SneackerColor{}
	}
	return true, sneakerColor

}

func DeleteShoeColorWithCloudDeps(sneakerColorId primitive.ObjectID) (bool, string) {
	wasFound, sneakerColor := FindShoeColorById(sneakerColorId)
	if !wasFound {
		return false, "Sneaker color not found"
	}
	var wasDeleted bool
	for _, imageData := range sneakerColor.Images {
		wasDeleted = database.DeleteImageByPublicId(imageData.Id)
		if !wasDeleted {
			return false, "Error deleting image from Cloudinary"
		}
	}
	result , err:= DeleteSneakerColorById(sneakerColorId)
	fmt.Println(result)
	fmt.Println(err)
	if err!=nil {
		return false, "Error deleting sneaker color"
	}
	return true, "Sneaker color deleted successfully"
}