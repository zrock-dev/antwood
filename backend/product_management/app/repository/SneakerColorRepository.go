package repository

import (
	"context"
	"product_management/app/database"
	"product_management/app/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func DeleteSneakerColorById(sneakerColorId primitive.ObjectID) bool {
	_, err := database.SneakerColorsCollection.DeleteOne(context.TODO(), bson.M{"_id": sneakerColorId})
	return err == nil
}


func FindShoeColorById(sneakerColorId primitive.ObjectID) (bool, models.SneakerColor) {
	var sneakerColor models.SneakerColor
	err := database.SneakerColorsCollection.FindOne(context.TODO(), bson.M{"_id": sneakerColorId}).Decode(&sneakerColor)
	if err != nil {
		return false, models.SneakerColor{}
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
		wasDeleted = DeleteImageByPublicId(imageData.ID)
		if !wasDeleted {
			return false, "Error deleting image from Cloudinary"
		}
	}

	wasDeleted = DeleteSneakerColorById(sneakerColorId)
	if !wasDeleted {
		return false, "Error deleting sneaker color"
	}
	return true, "Sneaker color deleted successfully"
}

func UpdateSneakerColor(sneakerColorId string, toUpdate bson.M) (bool, string) {
	if sneakerColorId != "" {
		id, err := primitive.ObjectIDFromHex(sneakerColorId)
		if err != nil {
			return false, "Error getting the sneaker color id"
		}

		_, err = database.SneakerColorsCollection.UpdateOne(
			context.TODO(),
			bson.M{"_id": id},
			toUpdate,
		)

		if err != nil {
			return false, err.Error()
		}

		return true, "Sneaker updated successfully"
	}

	return false, "Invalid sneaker id"
}

func InsertOneSneakerColor(sneakerColor models.SneakerColor) (*mongo.InsertOneResult, error) {
	insertResult, err := database.SneakerColorsCollection.
		InsertOne(context.TODO(), sneakerColor)
	return insertResult, err
}


func UpdateSneakerColorData(colorId string, newSneakerColorData models.SneakerColor, deletedImages []string) (models.SneakerColor, bool, string) {

	var updatedSneakerColor models.SneakerColor
	var statusUpdate bool
	sneakerColorID, err := primitive.ObjectIDFromHex(colorId)
	if err != nil {
		return updatedSneakerColor, false, "Error getting the sneaker color id"
	}

	statusUpdate, updatedSneakerColor = FindShoeColorById(sneakerColorID)
	
	if !statusUpdate {
		return updatedSneakerColor, false, "Error getting the sneaker color"
	}

	deleteMap := make(map[string]bool)
	for _, image := range deletedImages {
		deleteMap[image] = true
	}

	filteredImages := []models.ImageData{}


	for _, image := range updatedSneakerColor.Images {
		if !deleteMap[image.ID] {
			filteredImages = append(filteredImages, image)
		}
	}

	updatedSneakerColor.Images = filteredImages

	for _, deletedId := range deletedImages {
		wasDeleted := DeleteImageByPublicId(deletedId)
		if !wasDeleted {
			return updatedSneakerColor, false, "Error deleting image from Cloudinary"
		}
	}

	updatedSneakerColor.Images = append(updatedSneakerColor.Images, newSneakerColorData.Images...)

	updatedSneakerColor.Sizes = newSneakerColorData.Sizes


	toUpdate := validateUpdateData(updatedSneakerColor)
	wasUpdated, message := UpdateSneakerColor(colorId,  bson.M{"$set": toUpdate})

	if !wasUpdated {
		return updatedSneakerColor, false, message
	}

	return updatedSneakerColor, true, "Sneaker updated successfully"
}


func validateUpdateData(updatedSneakerColor models.SneakerColor) bson.M {
	toUpdate := bson.M{}
	if len(updatedSneakerColor.Images) > 0 {
		toUpdate["images"] = updatedSneakerColor.Images
	}
	if len(updatedSneakerColor.Sizes) > 0 {
		toUpdate["sizes"] = updatedSneakerColor.Sizes
	}
	return toUpdate
}