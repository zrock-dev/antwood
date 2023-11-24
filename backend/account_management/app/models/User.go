package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id           primitive.ObjectID `json:"id" bson:"_id"`
	Username     string             `json:"username"`
	Email        string             `json:"email"`
	Role         string             `json:"role"`
	Password     []byte             `json:"-"`
	ProviderAuth string             `json:"provider"`
}
