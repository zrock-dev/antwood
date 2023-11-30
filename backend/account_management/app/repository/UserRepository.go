package repository

import (
	"account_management/app/database"
	"account_management/app/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func InsertUser(user models.User) error {
	_, err := database.UsersCollection.InsertOne(context.TODO(), user)
	if err != nil {
		return err
	}
	return nil
}

func FindUserById(id string) (models.User, error) {
	var user models.User
	err := database.UsersCollection.FindOne(context.TODO(), bson.M{"id": id}).Decode(&user)
	if err != nil {
		return user, err
	}
	return user, nil
}

func FindUserByEmail(email string) (models.User, error) {
	var user models.User
	err := database.UsersCollection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&user)
	if err != nil {
		return user, err
	}
	return user, nil
}

func ChangeUserRole(role string, email string) (interface{}, error) {
	filter := bson.D{{Key: "email", Value: email}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "role", Value: role}}}}

	result, err := database.UsersCollection.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func AddSneakerToUserFavorites(sneakerID primitive.ObjectID, email string) (interface{}, error) {
	filter := bson.D{{Key: "email", Value: email}}
	operation := bson.D{{Key: "$push", Value: bson.D{{Key: "favorites", Value: sneakerID}}}}

	result, err := database.UsersCollection.UpdateOne(context.TODO(), filter, operation)

	if err != nil {
		return nil, err
	}

	return result, nil
}

func GetUserFavoriteSneakers(email string) ([]primitive.ObjectID, error) {
	var user models.User
	filter := bson.D{{Key: "email", Value: email}}
	err := database.UsersCollection.FindOne(context.TODO(), filter).Decode(&user)

	if err != nil {
		return nil, err
	}

	return user.Favorites, nil
}
