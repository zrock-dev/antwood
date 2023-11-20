package controllers

import (
	"encoding/json"
	"fmt"
	"os"
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
		fmt.Fprintf(os.Stderr, "Error verifying webhook signature: %v\n", err)
		return c.SendStatus(fiber.StatusBadRequest)
	}
	fmt.Println("Received event:", event.Type)
	switch event.Type {
	case "payment_intent.succeeded":
		err = HandleOnSessionsCompleted(&event)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return c.SendStatus(fiber.StatusBadRequest)
		}
	case "payment_intent.payment_failed":
		err  = HandleOnSessionsAsyncPaymentFailed(&event)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return c.SendStatus(fiber.StatusBadRequest)
		}
	case "payment_intent.payment_canceled":
		fmt.Println("Payment canceled")
	default:
		fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
	}

	return c.SendStatus(fiber.StatusOK)
}


func HandleOnSessionsCompleted(event *stripe.Event) error {

	fmt.Println("Payment succeeded")
	var paymentintent stripe.PaymentIntent
		err := json.Unmarshal(event.Data.Raw, &paymentintent)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return err
		}
		fmt.Println("Payment succeeded")
		metadata := paymentintent.Metadata
		orderID := metadata["orderId"]

		err= repository.UpdateUnpaidOrderPaidById(orderID, "paid")
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return err
		}
		return nil
}


func HandleOnSessionsAsyncPaymentFailed(event *stripe.Event) error {
	fmt.Println("Payment failed")
	return nil
}