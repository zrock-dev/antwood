package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	SneakerId      primitive.ObjectID `json:"sneakerId,omitempty" bson:"sneakerId,omitempty"`
	SneakerColorId primitive.ObjectID `json:"sneakerColorId" bson:"sneakerColorId"`
	Size           float64            `json:"size" bson:"size"`
	Amount         int                `json:"amount" bson:"amount"`
	Subtotal       float64            `json:"subtotal" bson:"subtotal"`
	Price          float64            `json:"price" bson:"price"`
	Image          string             `json:"image" bson:"image"`
	Name           string             `json:"name" bson:"name"`
}

type Order struct {
	ID            primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Products      []Product          `json:"products,omitempty" bson:"products,omitempty"`
	Subtotal      float64            `json:"subtotal" bson:"subtotal"`
	Extra         float64            `json:"extra" bson:"extra"`
	Total         float64            `json:"total" bson:"total"`
	TotalItems    int                `json:"totalItems" bson:"totalItems"`
	TaxPercentaje int                `json:"taxpercentaje" bson:"taxpercentaje"`
	TaxAmount     float64            `json:"taxamount" bson:"taxamoun"`
	Paid          string             `json:"paid" bson:"paid"`
	Email         string             `json:"email" bson:"email"`
	Shipping      Shipping           `json:"shipping" bson:"shipping"`
	Date          primitive.DateTime `json:"date" bson:"date"`
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
	Name    string  `json:"name" bson:"name"`
}

func NewOrder() *Order {
	return &Order{
		ID:            primitive.NewObjectID(),
		Products:      []Product{},
		Subtotal:      0,
		Extra:         0,
		Total:         0,
		TotalItems:    0,
		TaxPercentaje: 0,
		TaxAmount:     0,
		Paid:          "no-payed",
		Email:         "",
		Shipping:      *NewShipping(),
		Date:          primitive.NewDateTimeFromTime(time.Now()),
	}
}

func NewShipping() *Shipping {
	return &Shipping{
		Address: Address{},
		Name:    "",
	}
}
