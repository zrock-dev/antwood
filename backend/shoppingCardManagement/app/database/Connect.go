package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


var  DB *mongo.Database
var  OrdernsCollection *mongo.Collection

func Connect() {
	mongodb_uri := os.Getenv("MONGODB_URI")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodb_uri))
	if err != nil {
		panic(err)
	} else {
		log.Println("Connected to MongoDB")
	}

	DB = client.Database("authentication_app")
	OrdernsCollection = DB.Collection("orders")

}