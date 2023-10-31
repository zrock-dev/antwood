package database

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client mongo.Client

func ConnectToTheDatabase() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	URI := os.Getenv("MONGO_URI")
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	context := context.TODO()
	options := options.Client().ApplyURI(URI).SetServerAPIOptions(serverAPI)
	_, err := mongo.Connect(context, options)
	if err != nil {
		panic(err)
	}

	fmt.Println("database connected")

	// soleStyleDatabase := Client.Database("sneakerStore")
}
