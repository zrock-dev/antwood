package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Shoe struct {
	ID            primitive.ObjectID   `bson:"_id,omitempty"`
	Name          string               `json:"name" form:"name" bson:"name,omitempty"`
	Description   string               `json:"description" form:"description" bson:"description,omitempty"`
	Price         int                  `json:"price" form:"price" bson:"price,omitempty"`
	Colors        []primitive.ObjectID `json:"colors" form:"colors" bson:"colors,omitempty"`
	Tags          []string             `json:"tags" form:"tags" bson:"tags,omitempty"`
	Reviews       []primitive.ObjectID `json:"reviews" form:"reviews" bson:"reviews,omitempty"`
	Qualification int                  `json:"qualification" form:"qualification" bson:"qualification,omitempty"`
	LastDate      primitive.DateTime   `json:"lastDate" form:"lastDate" bson:"lastDate"`
	SalesQuantity int                  `json:"salesQuantity" form:"salesQuantity" bson:"salesQuantity,omitempty"`
	Promotion     primitive.ObjectID   `json:"promotion" form:"promotion" bson:"promotion,omitempty"`
}
