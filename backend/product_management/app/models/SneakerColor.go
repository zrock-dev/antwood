package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ImageData struct {
	URL string `json:"url" form:"url" bson:"url"`
	ID  string `json:"id" form:"id" bson:"id"`
}

type SneakerColor struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Images   []ImageData        `json:"images" form:"images" bson:"images"`
	Sizes    []float32          `json:"sizes,omitempty" form:"sizes,omitempty" bson:"sizes,omitempty"`
	Quantity int                `json:"quantity,omitempty" form:"quantity,omitempty" bson:"quantity,omitempty"`
}

func DefaultSneakerColor() *SneakerColor {
	return &SneakerColor{
		ID:       primitive.NewObjectID(),
		Images:   []ImageData{},
		Sizes:    []float32{},
		Quantity: 0,
	}
}
