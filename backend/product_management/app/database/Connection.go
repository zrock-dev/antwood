package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var SoleStyleDatabase mongo.Database
var SneakerCollection mongo.Collection
var SneakerColorsCollection mongo.Collection

func ConnectToTheDatabase() {
	URI := os.Getenv("MONGO_URI")
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	context := context.TODO()
	options := options.Client().ApplyURI(URI).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context, options)
	if err != nil {
		panic(err)
	}
	log.Println("database connected")
	initDatabase(*client)
}

func initDatabase(client mongo.Client) {
	SoleStyleDatabase = *client.Database("solestyle")
	initSneakerCollection(SoleStyleDatabase)
	initSneakerColorCollection(SoleStyleDatabase)
}

func initSneakerCollection(database mongo.Database) {
	SneakerCollection = *database.Collection("sneakers")
}

func initSneakerColorCollection(database mongo.Database) {
	SneakerColorsCollection = *database.Collection("sneakerColors")
}
