package repository

import (
	"context"
	"shopping-card-management/app/database"
	"shopping-card-management/app/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func SaveOrder(order *models.Order) error {
  insertResult , err	:= database.OrdersCollection.InsertOne(context.TODO(), order)

  if err!= nil {
  	return err
  }


  if insertResult.InsertedID == nil {
  	return err
  }else{
  	return nil
  }
}


func DeleteOrderById(id string) error {
	ojId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	dleteResult , err:=database.OrdersCollection.DeleteOne(context.TODO(), bson.M{"_id": ojId})

	if dleteResult.DeletedCount == 0 {
		return err
	}else{
		return nil
	}
}


func UpdateOrderPaidById(id string, paidState string) error {
	ojId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	dleteResult , err:=database.OrdersCollection.UpdateOne(context.TODO(), bson.M{"_id": ojId}, bson.M{"$set": bson.M{"paid": paidState}})

	if dleteResult.MatchedCount == 0 {
		return err
	}else{
		return nil
	}

}