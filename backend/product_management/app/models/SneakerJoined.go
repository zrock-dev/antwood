package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type SneakerWithColors struct {
	ID            primitive.ObjectID   `json:"_id,omitempty"`
	Name          string               `json:"name"`
	Description   string               `json:"description"`
	Price         int                  `json:"price"`
	Colors        []primitive.ObjectID `json:"colors"`
	Types         []SneakerColor       `json:"types"`
	Tags          []string             `json:"tags"`
	Reviews       []primitive.ObjectID `json:"reviews"`
	Qualification int                  `json:"qualification"`
	LastDate      primitive.DateTime   `json:"lastDate"`
	SalesQuantity int                  `json:"salesQuantity"`
	PromotionCode primitive.ObjectID   `json:"promotionCode"`
}
