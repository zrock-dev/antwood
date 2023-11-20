package repository


import (
	"context"
	"shopping-card-management/app/database"
	"shopping-card-management/app/models"

	"go.mongodb.org/mongo-driver/bson"
)

func GetOrdersByUserEmail(email string) ([]*models.Order, error) {
	var orders []*models.Order
	
	cursor , err := database.OrdersCollection.Find(context.TODO(), bson.M{"email": email})

	if err != nil {
		return orders, err
	}
	 err = cursor.All(context.TODO(), &orders)

	if err != nil {
		return orders, err
	}else{
		return orders, nil
	}
}
