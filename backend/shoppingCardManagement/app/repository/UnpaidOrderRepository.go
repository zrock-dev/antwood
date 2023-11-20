package repository

import (
	"context"
	"shopping-card-management/app/database"
	"shopping-card-management/app/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func SaveUnpaidOrder(order *models.Order) error {
  insertResult , err	:= database.UnpaidOrdersCollection.InsertOne(context.TODO(), order)

  if err!= nil {
  	return err
  }

  if insertResult.InsertedID == nil {
  	return err
  }else{
  	return nil
  }
}

func SaveDynamicUnpaidOrder(order *models.Order) error {
	orderResult,_ := FindOUnpaidrderById(order.ID)
	
	if orderResult != nil {
		order.Paid = orderResult.Paid
		return UpdateUnpaidOrder(order)
	}else{
		return SaveUnpaidOrder(order)
	}
}

func UpdateUnpaidOrder(order *models.Order) error {

	updateResult , err:= database.UnpaidOrdersCollection.UpdateOne(context.TODO(), bson.M{"_id": order.ID}, bson.M{"$set": order})
	if updateResult.MatchedCount == 0 {
		return err
	}else{
		return nil
	}
}



func FindOUnpaidrderById(id  primitive.ObjectID) (*models.Order, error) {
	var order *models.Order
	err := database.UnpaidOrdersCollection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&order)
	if err != nil {
		return nil, err
	}
	return order, nil
}


func DeleteUnpaidOrderById(id string) error {
	ojId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	dleteResult , err:=database.UnpaidOrdersCollection.DeleteOne(context.TODO(), bson.M{"_id": ojId})

	if dleteResult.DeletedCount == 0 {
		return err
	}else{
		return nil
	}
}


func UpdateUnpaidOrderPaidById(id string, paidState string) error {
	ojId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	res , err:= database.UnpaidOrdersCollection.UpdateOne(context.TODO(), bson.M{"_id": ojId}, bson.M{"$set": bson.M{"paid": paidState}})

	if res.MatchedCount == 0 {
		return err
	}else{
		orderPaid,err := FindOUnpaidrderById(ojId)
		if err != nil {
			return err
		}
		orderPaid.ID= primitive.NewObjectID()
		database.OrdersCollection.InsertOne(context.TODO(), orderPaid)
		return nil
	}
}