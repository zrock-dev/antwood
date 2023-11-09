package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ColorObject struct {
	ID    primitive.ObjectID `json:"_id" form:"_id" bson:"_id"`
	Color string             `json:"color" form:"color" bson:"color"`
}

type Sneaker struct {
	ID            primitive.ObjectID   `json:"_id" bson:"_id,omitempty"`
	Name          string               `json:"name" form:"name" bson:"name"`
	Description   string               `json:"description" form:"description" bson:"description"`
	Price         int                  `json:"price" form:"price" bson:"price"`
	Brand         string               `json:"brand,omitempty" form:"brand,omitempty" bson:"brand,omitempty"`
	Colors        []ColorObject        `json:"colors" form:"colors" bson:"colors"`
	Tags          []string             `json:"tags" form:"tags" bson:"tags"`
	Reviews       []primitive.ObjectID `json:"reviews" form:"reviews" bson:"reviews"`
	Qualification int                  `json:"qualification" form:"qualification" bson:"qualification"`
	LastDate      primitive.DateTime   `json:"lastDate" form:"lastDate" bson:"lastDate"`
	SalesQuantity int                  `json:"salesQuantity" form:"salesQuantity" bson:"salesQuantity"`
	PromotionCode primitive.ObjectID   `json:"promotionCode" form:"promotionCode" bson:"promotionCode"`
}

func DefaultSneaker() *Sneaker {
	return &Sneaker{
		ID:            primitive.NewObjectID(),
		Name:          "",
		Description:   "",
		Price:         0,
		Colors:        []ColorObject{},
		Tags:          []string{},
		Reviews:       []primitive.ObjectID{},
		Qualification: 0,
		LastDate:      primitive.NewDateTimeFromTime(time.Now()),
		SalesQuantity: 0,
		PromotionCode: primitive.ObjectID{},
	}
}
