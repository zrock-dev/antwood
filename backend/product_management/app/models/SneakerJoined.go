package models

import (

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SneakerWithColors struct {
	ID            primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Name          string               `json:"name"`
	Description   string               `json:"description,omitempty"`
	Price         float32              `json:"price"`
	Colors        []ColorObject        `json:"colors" form:"colors" bson:"colors"`
	Types         []SneakerColor       `json:"types"`
	Tags          []string             `json:"tags,omitempty"`
	Reviews       SneakerReview `json:"reviews,omitempty"`
	Qualification int                  `json:"qualification,omitempty"`
	LastDate      primitive.DateTime   `json:"lastDate"`
	SalesQuantity int                  `json:"salesQuantity"`
	PromotionCode primitive.ObjectID   `json:"promotionCode"`
	Brand         string               `json:"brand,omitempty"`
}
