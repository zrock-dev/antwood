package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


var  DB *mongo.Database
var  OrdersCollection *mongo.Collection

func Connect() {
	mongodb_uri := os.Getenv("MONGODB_URI")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodb_uri))
	if err != nil {
		fmt.Println("Error connecting to MongoDB")
		//panic(err)
	} else {
		log.Println("Connected to MongoDB")
	}

	DB = client.Database("authentication_app")
	OrdersCollection = DB.Collection("orders")

}