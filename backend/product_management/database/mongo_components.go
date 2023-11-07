package database

import "go.mongodb.org/mongo-driver/mongo"

func SneakersDatabase() *mongo.Database {
	return GetMongoClient().Database("solestyle")
}

func SneakersCollection() *mongo.Collection {
	return SneakersDatabase().Collection("sneakers")
}

func SneakerColorsCollection() *mongo.Collection {
	return SneakersDatabase().Collection("sneakerColors")
}
