package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RatingSummary struct {
	Star1 int `json:"star1" form:"star1" bson:"star1"`
	Star2 int `json:"star2" form:"star2" bson:"star2"`
	Star3 int `json:"star3" form:"star3" bson:"star3"`
	Star4 int `json:"star4" form:"star4" bson:"star4"`
	Star5 int `json:"star5" form:"star5" bson:"star5"`
}

type SneakerReview struct {
	RatingSummary RatingSummary `json:"ratingSummary" form:"ratingSummary" bson:"ratingSummary"`
	Total int `json:"total" form:"total" bson:"total"`
}

type Review struct {
    ID          primitive.ObjectID `json:"_id" form:"_id" bson:"_id"`
	SneakerID   primitive.ObjectID `json:"sneakerId" form:"sneakerId" bson:"sneakerId"`
    Username    string            `json:"username" form:"username" bson:"username"`
	UserEmail   string            `json:"userEmail" form:"userEmail" bson:"userEmail"`
	ReviewDate  primitive.DateTime `json:"reviewDate" form:"reviewDate" bson:"reviewDate"`
    Description string            `json:"description" form:"description" bson:"description"`
    Rate        int               `json:"rate" form:"rate" bson:"rate"`
}


func DefaultSneakerReview() SneakerReview {
	return SneakerReview{
		RatingSummary: RatingSummary{
			Star1: 0,
			Star2: 0,
			Star3: 0,
			Star4: 0,
			Star5: 0,
		},
		Total: 0,
	}
}

func DefaultReview() *Review {
	return &Review{
		ID: primitive.NewObjectID(),
		ReviewDate: primitive.NewDateTimeFromTime(time.Now()),
		Description: "",
		Rate: 0,
	}
}


