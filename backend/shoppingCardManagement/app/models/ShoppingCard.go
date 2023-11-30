package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)


type Product struct {
	SneakerId primitive.ObjectID `json:"sneakerId,omitempty" bson:"sneakerId,omitempty"`
	SneakerColorId primitive.ObjectID `json:"sneakerColorId" bson:"sneakerColorId"`
	Size float32 `json:"size" bson:"size"`
	Amount int `json:"amount" bson:"amount"`
	Subtotal float32 `json:"subtotal" bson:"subtotal"`
	Price float32 `json:"price" bson:"price"`
	Image string `json:"image" bson:"image"`
	Name string `json:"name" bson:"name"`
}

type Order struct {
	ID primitive.ObjectID  `json:"id,omitempty" bson:"_id,omitempty"`
	Products []Product `json:"products,omitempty" bson:"products,omitempty"`
	Subtotal float32 `json:"subtotal" bson:"subtotal"`
	Extra float32 `json:"extra" bson:"extra"`
	Total float32 `json:"total" bson:"total"`
	TotalItems int `json:"totalItems" bson:"totalItems"`
	Paid string `json:"paid" bson:"paid"`
	Email string `json:"email" bson:"email"`
	Shipping Shipping `json:"shipping" bson:"shipping"`
	Date primitive.DateTime `json:"date" bson:"date"`
}


type Address struct {
	City       string `json:"city" bson:"city"`
	Country    string `json:"country" bson:"country"`
	Line1      string `json:"line1" bson:"line1"`
	Line2      string `json:"line2" bson:"line2"`
	PostalCode string `json:"postal_code" bson:"postal_code"`
	State      string `json:"state" bson:"state"`
}

type Shipping struct {
	Address Address `json:"address" bson:"address"`
	Name string `json:"name" bson:"name"`
}


func NewOrder() *Order {
	return &Order{
		ID: primitive.NewObjectID(),
		Products: []Product{},
		Subtotal: 0,
		Extra: 0,
		Total: 0,
		TotalItems: 0,
		Paid: "no-payed",
		Email: "",
		Shipping: *NewShipping(),
		Date: primitive.NewDateTimeFromTime(time.Now()),
	}
}


func NewShipping() *Shipping {
	return &Shipping{
		Address: Address{},
		Name: "",
	}
}