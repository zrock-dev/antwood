package repository

import (
	"context"
	"shopping-card-management/app/database"
	"shopping-card-management/app/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetOrderPageByUserEmail(email string, skip int, pageSize int) ([]*models.Order, error) {
    options := options.Find().SetSkip(int64((skip-1)*pageSize)).SetLimit(int64(pageSize))
    var orders []*models.Order
  
    cursor, err := database.OrdersCollection.Find(context.TODO(), bson.M{"email": email}, options)
    if err != nil {
        return orders, err
    }
    defer cursor.Close(context.TODO())

    if err := cursor.All(context.TODO(), &orders); err != nil {
        return orders, err
    }

    if orders == nil {
        return []*models.Order{}, nil
    }

    return orders, nil
}

func GetOrderCountByEmail(email string) (int, error) {

    cursor , err := database.OrdersCollection.Find(context.TODO(), bson.M{"email": email})
	
	if err != nil {
        return 0, err
    }
    defer cursor.Close(context.TODO())

    var orders []*models.Order
    if err := cursor.All(context.TODO(), &orders); err != nil {
        return 0, err
    }

    return len(orders), nil
}


func UserAlreadyOrderSneaker(email string, sneakerID primitive.ObjectID) (interface{}, error) {
	groupOrdersByEmail := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "email", Value: email}}}}

	groupOrdersBySneakerID := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "products", Value: bson.D{
				{Key: "$elemMatch", Value: bson.D{
					{Key: "sneakerId", Value: sneakerID}}}}}}}}

	countResults := bson.D{
		{Key: "$count", Value: "purchases"}}

	pipeline := mongo.Pipeline{groupOrdersByEmail, groupOrdersBySneakerID, countResults}

	cursor, err := database.OrdersCollection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return nil, err
	}

	var result []bson.M

	err = cursor.All(context.TODO(), &result)
	if err != nil {
		return nil, err
	}

	return result, nil
}
