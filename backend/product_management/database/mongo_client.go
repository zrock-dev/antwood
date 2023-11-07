package database

import (
	"context"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetMongoClient() *mongo.Client {
	uri := os.Getenv("MONGO_URI")
	opts := options.Client().ApplyURI(uri)

	client, error := mongo.Connect(context.TODO(), opts)

	if error != nil {
		panic(error)
	}

	return client
}
