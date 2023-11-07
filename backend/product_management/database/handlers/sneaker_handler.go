package handlers

import (
	"ant-wood/product-management/app/models"
	"ant-wood/product-management/database"
	"ant-wood/product-management/database/utils"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func getSneakersCollection() *mongo.Collection {
	return database.SneakersCollection()
}

func FindSneaker(requiredSneakerID string) (models.Sneaker, error) {
	var sneaker models.Sneaker
	objectID, err := primitive.ObjectIDFromHex(requiredSneakerID)
	if err != nil {
		return sneaker, err
	}

	filter := bson.D{{Key: "_id", Value: objectID}}

	err = getSneakersCollection().FindOne(context.TODO(), filter).Decode(&sneaker)

	if err != nil {
		return sneaker, err
	}

	return sneaker, nil
}

func InsertSneaker(newSneaker *models.Sneaker) (interface{}, error) {
	insertResult, err := getSneakersCollection().InsertOne(context.TODO(), newSneaker)
	if err != nil {
		return nil, err
	}

	return insertResult, nil
}

func InsertNewTag(requiredSneakerID string, newTag string) (interface{}, error) {
	sneakerFounded, err := FindSneaker(requiredSneakerID)
	if err != nil {
		return nil, err
	}

	return utils.InsertElementIntoArray[string](getSneakersCollection(), requiredSneakerID, "tags", sneakerFounded.Tags, newTag)
}

func ModifyEntireSneaker(newSneakerModel *models.Sneaker) interface{} {
	return utils.ChangeEntireDocument(getSneakersCollection(), newSneakerModel.ID, newSneakerModel)
}

func ModifySneakerName(requiredSneakerID string, newSneakerName string) (interface{}, error) {
	return utils.UpdateSingleValue[string](getSneakersCollection(), requiredSneakerID, "name", newSneakerName)
}

func ModifySneakerBrand(requiredSneakerID string, newSneakerBrand string) (interface{}, error) {
	return utils.UpdateSingleValue[string](getSneakersCollection(), requiredSneakerID, "brand", newSneakerBrand)
}

func ModifySneakerDescription(requiredSneakerID string, newSneakerDescription string) (interface{}, error) {
	return utils.UpdateSingleValue[string](getSneakersCollection(), requiredSneakerID, "description", newSneakerDescription)
}

func ModifySneakerPromotion(requiredSneakerID string, newSneakerPromotion string) (interface{}, error) {
	promotionID, err := primitive.ObjectIDFromHex(newSneakerPromotion)
	if err != nil {
		return nil, err
	}
	return utils.UpdateSingleValue[primitive.ObjectID](getSneakersCollection(), requiredSneakerID, "promotionCode", promotionID)
}

func ModifySneakerPrice(requiredSneakerID string, newSneakerPrice int) (interface{}, error) {
	return utils.UpdateSingleValue[int](getSneakersCollection(), requiredSneakerID, "price", newSneakerPrice)
}

func ModifySneakerQualification(requiredSneakerID string, newSneakerQualification int) (interface{}, error) {
	return utils.UpdateSingleValue[int](getSneakersCollection(), requiredSneakerID, "qualification", newSneakerQualification)
}

func ModifySneakerQuantity(requiredSneakerID string, newSneakerQuantity int) (interface{}, error) {
	return utils.UpdateSingleValue[int](getSneakersCollection(), requiredSneakerID, "salesQuantity", newSneakerQuantity)
}

func DeleteSneakerFromID(requiredSneakerID string) (interface{}, error) {
	return utils.DeleteDocumentFromCollection(getSneakersCollection(), requiredSneakerID)
}

func GetRestaurantsPage(pageSize int64, pageIndex int64) ([]models.Sneaker, error) {
	coll := getSneakersCollection()
	filter := bson.D{}
	cursor, err := coll.Find(context.TODO(), filter, options.Find().SetSkip(pageIndex*pageSize).SetLimit(pageSize))
	var restaurants []models.Sneaker

	if err != nil {
		return restaurants, err
	}

	if err = cursor.All(context.TODO(), &restaurants); err != nil {
		return restaurants, err
	}

	return restaurants, nil
}
