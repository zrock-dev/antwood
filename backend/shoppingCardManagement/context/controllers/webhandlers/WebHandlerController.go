package controllers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"shopping-card-management/app/repository"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/webhook"
)

const MaxBodyBytes = int(65536)

func HandleWebhook(c *fiber.Ctx) error {
	payload := c.Body()

	if len(payload) > MaxBodyBytes {
		return c.SendStatus(fiber.StatusRequestEntityTooLarge)
	}

	endpointSecret := "whsec_76f8aecca259c670e70605a683c7d5ce81de35b95858e72552a02bc09faf1bea"

	event, err := webhook.ConstructEventWithOptions(payload, c.Get("Stripe-Signature"), endpointSecret, webhook.ConstructEventOptions{
		IgnoreAPIVersionMismatch: true,
	})

	if err != nil {
		log.Printf("Error verifying webhook signature: %v\n", err)
		return c.SendStatus(fiber.StatusBadRequest)
	}

	switch event.Type {
	case "payment_intent.succeeded":
		err = HandleOnIntentSuccess(&event)
		if err != nil {
			log.Println("Error parsing webhook JSON:", err)
			return c.SendStatus(fiber.StatusBadRequest)
		}
	case "payment_intent.payment_failed":
		err = HandleOnSessionsAsyncPaymentFailed(&event)
		if err != nil {
			log.Println("Error parsing webhook JSON:", err)
			return c.SendStatus(fiber.StatusBadRequest)
		}
	case "payment_intent.payment_canceled":
		log.Println("Payment canceled")
	default:
		log.Println("Unhandled event type:", event.Type)
	}

	return c.SendStatus(fiber.StatusOK)
}

func HandleOnIntentSuccess(event *stripe.Event) error {

	var paymentintent stripe.PaymentIntent
	err := json.Unmarshal(event.Data.Raw, &paymentintent)
	if err != nil {
		log.Printf("Error parsing webhook JSON: %v\n", err)
		return err
	}
	metadata := paymentintent.Metadata
	orderID := metadata["orderId"]
	order, err := repository.UpdateUnpaidOrderPaidById(orderID, "paid")

	if err != nil {
		return err
	}

	orderJSON, err := json.Marshal(order.Products)
	if err != nil {
		log.Println("Error al convertir el objeto order a JSON:", err)
		return err
	}

	req, err := http.NewRequest("PUT", "http://localhost/sneakers/quantities", bytes.NewBuffer(orderJSON))
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
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Println("Error when sending request:", err)
		return err
	}

	if err != nil {
		log.Println("Error parsing webhook JSON:", err)
		return err
	}

	return nil
}

func HandleOnSessionsAsyncPaymentFailed(event *stripe.Event) error {
	log.Println("Payment failed")
	return nil
}
