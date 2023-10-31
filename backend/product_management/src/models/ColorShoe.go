package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ColorShoe struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Images   []string           `json:"images" form:"images" bson:"images"`
	Sizes    []float32          `json:"sizes" form:"sizes" bson:"sizes"`
	Quantity int                `json:"quantity" form:"quantity" bson:"quantity"`
}
