package controllers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"shopping-card-management/app/models"
	"shopping-card-management/app/repository"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/paymentintent"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreatePaymentIntent(c *fiber.Ctx) error {
	stripe.Key = os.Getenv("PAYMENT_SECRET_KEY")
	email := c.Params("email")
	order := models.NewOrder()
	if err := c.BodyParser(&order); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	  params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(order.Total * 100)),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
		  Enabled: stripe.Bool(false),
		},
	  }

	  order.Email = email
	  err := repository.SaveDynamicUnpaidOrder(order)
	  if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	  }

	  params.AddMetadata("orderId", order.ID.Hex())

	  pi, err := paymentintent.New(params)
	  log.Printf("pi.New: %v", pi.ClientSecret)

	
	  if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	  }
	
	  response := struct {
		ClientSecret string `json:"clientSecret"`
		OrderId      string `json:"orderId"`
	}{
		ClientSecret: pi.ClientSecret,
		OrderId:      order.ID.Hex(),
	  }

	  return c.JSON(response)
}


func HandlePaymentStatus(c *fiber.Ctx) error {
	stripe.Key = os.Getenv("PAYMENT_SECRET_KEY")
	
	paymentintentId := c.Params("paymentintentid")
	status := c.Params("status")
	params := &stripe.PaymentIntentParams{}
	params.AddExpand("payment_method")

	paymentintentRes, err := paymentintent.Get(paymentintentId, params)

	if err != nil {
		return c.JSON(fiber.Map{
			"message" : err.Error(),
			"status" : fiber.StatusInternalServerError,
		})
	}

	metadata := paymentintentRes.Metadata
	orderId:= metadata["orderId"]


	orderObjId,err := primitive.ObjectIDFromHex(orderId)
	
	if err != nil {
		return c.JSON(fiber.Map{
			"message" : err.Error(),
			"status" : fiber.StatusInternalServerError,
		})
	}


	err = HandleOnIntentSuccess(orderId)

	if err != nil {
		return c.JSON(fiber.Map{
			"message" : err.Error(),
			"status" : fiber.StatusForbidden,
		})
	}


	order, err := repository.FindOUnpaidrderById(orderObjId)

	if err != nil {
		return c.JSON(fiber.Map{
			"message" : err.Error(),
			"status" : fiber.StatusForbidden,
		})
	}


	if order.Paid == "paid" && status == "succeeded" {
		log.Println("**************************************************************************************************************")
		log.Println("**************************************************************************************************************")
		log.Println("Payment success")
		log.Println(orderId)
		log.Println("**************************************************************************************************************")
		log.Println("**************************************************************************************************************")
		err  = repository.DeleteUnpaidOrderById(orderId)
	
		if err != nil {
			return c.JSON(fiber.Map{
				"message" : err.Error(),
				"status" : fiber.StatusForbidden,
			})
		}
			return c.JSON(fiber.Map{
				"message" : "Payment success",
				"status" : fiber.StatusOK,
			})
		
	}else{
		return c.JSON(fiber.Map{
			"message" :"Error with payment status",
			"status" : fiber.StatusBadRequest,
		})
	}
}


func HandleOnIntentSuccess(orderId string) error {

	orderObjectId , err := primitive.ObjectIDFromHex(orderId)

	if err!= nil {
		return err
	}

	order, err := repository.FindOUnpaidrderById(orderObjectId)

	if err != nil {
		return err
	}

	if order.Paid == "paid" {
		return &fiber.Error{
			Code:    http.StatusBadRequest,
			Message: "Order already paid",
		}
	}

	orderJSON, err := json.Marshal(order.Products)
	if err != nil {
		log.Println("Error parsing sneakers JSON:", err)
		return err
	}


	log.Println("orderJSON:", orderJSON)



	req, err := http.NewRequest("PUT", "http://product_management:4000/sneakers/quantities", bytes.NewBuffer(orderJSON))
	if err != nil {
		log.Println("Error when creating request:", err)
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error when sending request:", err)
		return err
	}


	if resp.StatusCode != http.StatusOK {
		return &fiber.Error{
			Code:    resp.StatusCode,
			Message: "Error updating quantities",
		}
	}

	defer resp.Body.Close()

	if err != nil {
		log.Println("Error obtaining the order JSON:", err)
		return err
	}

	_ , err = repository.UpdateUnpaidOrderPaidById(orderId, "paid")

	if err != nil{
		return err 
	}

	return nil
}

