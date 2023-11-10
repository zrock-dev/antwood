package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

var UsersCollection *mongo.Collection
var ReviewsCollection *mongo.Collection


func Connect() {
	mongodb_uri := os.Getenv("MONGODB_URI")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodb_uri))
	if err != nil {
		panic(err)
	} else {
		log.Println("Connected to MongoDB")
	}

	DB = client.Database("authentication_app")
	UsersCollection = DB.Collection("users")
	ReviewsCollection = DB.Collection("reviews")
}

func Disconnect() {
	err := DB.Client().Disconnect(context.TODO())
	if err != nil {
		panic(err)
	}
}

