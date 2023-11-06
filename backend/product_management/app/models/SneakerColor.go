package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ImageData struct {
	URL string `json:"url" form:"url" bson:"url"`
	ID  string `json:"id" form:"id" bson:"id"`
}

type SneakerColor struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id" form:"id"`
	Images   []ImageData        `json:"images" form:"images" bson:"images"`
	Sizes    []float32          `json:"sizes" form:"sizes" bson:"sizes"`
	Quantity int                `json:"quantity" form:"quantity" bson:"quantity"`
}

func DefaultSneakerColor() *SneakerColor {
	return &SneakerColor{
		ID:       primitive.NewObjectID(),
		Images:   []ImageData{},
		Sizes:    []float32{},
		Quantity: 0,
	}
}
