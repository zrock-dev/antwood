package models

import "go.mongodb.org/mongo-driver/bson/primitive"


type Product struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Color primitive.ObjectID `json:"color" bson:"color"`
	Size float32 `json:"size" bson:"size"`
	Amount int `json:"amount" bson:"amount"`
	Subtotal float32 `json:"subtotal" bson:"subtotal"`
}

type ShoppingCard struct {
	ID primitive.ObjectID  `json:"_id,omitempty" bson:"_id,omitempty"`
	Products []Product `json:"products,omitempty" bson:"products,omitempty"`
	Subtotal float32 `json:"subtotal" bson:"subtotal"`
	Total float32 `json:"total" bson:"total"`
}


type Order struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	ShoppingCardID primitive.ObjectID `json:"shoppingCardID" bson:"shoppingCardID"`
    Paid string `json:"paid" bson:"paid"`
	Email string `json:"email" bson:"email"`
}