package repository

import (
	"account_management/app/database"
	"account_management/app/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
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

