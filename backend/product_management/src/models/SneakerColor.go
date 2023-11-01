package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SneakerColor struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Images   []string           `json:"images" form:"images" bson:"images"`
	Sizes    []float32          `json:"sizes" form:"sizes" bson:"sizes"`
	Quantity int                `json:"quantity" form:"quantity" bson:"quantity"`
}

func DefaultSneakerColor() *SneakerColor {
	return &SneakerColor{
		ID:       primitive.NewObjectID(),
		Images:   []string{},
		Sizes:    []float32{},
		Quantity: 0,
	}
}
