package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SneakerColorData struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" json:"id" form:"id"`
	Color string             `json:"color" form:"color" bson:"color"`
}

type Sneaker struct {
	ID            primitive.ObjectID   `bson:"_id,omitempty" json:"id" form:"id"`
	Name          string               `json:"name" form:"name" bson:"name"`
	Description   string               `json:"description" form:"description" bson:"description"`
	Price         float32              `json:"price" form:"price" bson:"price"`
	Brand         string               `json:"brand" form:"brand" bson:"brand"`
	Colors        []SneakerColorData   `json:"colors" form:"colors" bson:"colors"`
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
		Colors:        []SneakerColorData{},
		Tags:          []string{},
		Reviews:       []primitive.ObjectID{},
		Qualification: 0,
		LastDate:      primitive.NewDateTimeFromTime(time.Now()),
		SalesQuantity: 0,
		PromotionCode: primitive.ObjectID{},
	}
}
