package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ImageData struct {
	URL string `json:"url" form:"url" bson:"url"`
	ID  string `json:"id" form:"id" bson:"id"`
}

type SizeData struct {
	Value    float64 `json:"value" form:"value" bson:"value"`
	Quantity int     `json:"quantity" form:"quantity" bson:"quantity"`
}

type SneakerColor struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Images []ImageData        `json:"images" form:"images" bson:"images"`
	Sizes  []SizeData         `json:"sizes,omitempty" form:"sizes,omitempty" bson:"sizes,omitempty"`
}

func DefaultSneakerColor() *SneakerColor {
	return &SneakerColor{
		ID:     primitive.NewObjectID(),
		Images: []ImageData{},
		Sizes:  []SizeData{},
	}
}
