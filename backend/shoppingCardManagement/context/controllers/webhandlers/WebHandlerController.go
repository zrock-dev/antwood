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

	endpointSecret := "whsec_748778bd6e9668c4ab11983e812fda7288fd5ed48d1e897d598340c746512583"


	event, err := webhook.ConstructEventWithOptions(payload, c.Get("Stripe-Signature"), endpointSecret, webhook.ConstructEventOptions{
		IgnoreAPIVersionMismatch: true,
	})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error verifying webhook signature: %v\n", err)
		return c.SendStatus(fiber.StatusBadRequest)
	}

	switch event.Type {
	case "checkout.session.completed":
		err = HandleOnSessionsCompleted(&event)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return c.SendStatus(fiber.StatusBadRequest)
		}
	case "checkout.session.async_payment_failed":
		err  = HandleOnSessionsAsyncPaymentFailed(&event)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return c.SendStatus(fiber.StatusBadRequest)
		}
	default:
		fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
	}

	return c.SendStatus(fiber.StatusOK)
}


func HandleOnSessionsCompleted(event *stripe.Event) error {
	var session stripe.CheckoutSession
		err := json.Unmarshal(event.Data.Raw, &session)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return err
		}

		params := &stripe.CheckoutSessionParams{}
		params.AddExpand("metadata")

		metadata := session.Metadata
		orderID := metadata["orderId"]
		err= repository.UpdateOrderPaidById(orderID, "paid")
		
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			return err
		}
		
		return nil
}


func HandleOnSessionsAsyncPaymentFailed(event *stripe.Event) error {
	return nil
}