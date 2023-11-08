package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Sneaker struct {
	ID            primitive.ObjectID   `bson:"_id,omitempty"`
	Name          string               `bson:"name"`
	Brand         string               `bson:"brand"`
	Description   string               `bson:"description"`
	Price         int                  `bson:"price"`
	Colors        []ColorData          `bson:"colors,omitempty"`
	Tags          []string             `bson:"tags,omitempty"`
	Reviews       []primitive.ObjectID `bson:"reviews,omitempty"`
	Qualification int                  `bson:"qualification,omitempty"`
	LastDate      primitive.DateTime   `bson:"lastDate,omitempty"`
	SalesQuantity int                  `bson:"salesQuantity,omitempty"`
	PromotionCode primitive.ObjectID   `bson:"promotionCode,omitempty"`
}

type SneackerColor struct {
	ID       primitive.ObjectID  `bson:"_id,omitempty"`
	Images   []SneakerColorImage `bson:"images"`
	Sizes    []int8              `bson:"sizes"`
	Quantity int32               `bson:"quantity"`
}

type SneakerColorImage struct {
	Url string `bson:"url"`
	Id  string `bson:"id"`
}



type ColorData struct {
	ID  primitive.ObjectID `bson:"_id,omitempty" json:"id" form:"id"`
	Color  string `json:"color" form:"color" bson:"color"`
}

