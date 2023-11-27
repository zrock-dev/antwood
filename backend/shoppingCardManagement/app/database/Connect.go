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
var  UnpaidOrdersCollection *mongo.Collection

func Connect() {
	mongodb_uri := os.Getenv("MONGODB_URI")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodb_uri))
	if err != nil {
		fmt.Println("Error connecting to MongoDB")
	} else {
		log.Println("Connected to MongoDB")
	}

	DB = client.Database("orders")
	OrdersCollection = DB.Collection("orders")
	UnpaidOrdersCollection = DB.Collection("unpaid-orders")
}