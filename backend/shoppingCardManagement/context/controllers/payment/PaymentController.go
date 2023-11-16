package controllers

import (
	"log"
	"shopping-card-management/app/models"
	"shopping-card-management/app/repository"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/checkout/session"
)

func MakePayment(c *fiber.Ctx) error {
	stripe.Key = "sk_test_51NTGkfCzrx5SveTYwJEcMtEQHWLvHM2LKOIAOvURFKGrLtfh00UHfRdi0OJ6cDMTEqV74OkbCABVMozWgeLsIICD00HrPwVqb3"

	 shoppingCard :=  models.NewShoppingCard()

	if err := c.BodyParser(&shoppingCard); err != nil {
		return c.Status(400).SendString("Invalid sneaker shopping data")
	}

	email := c.Query("email")	
	order  := models.NewOrder()

	params := getParams(email, shoppingCard, order)
	s, err := session.New(params)

	if err != nil {
		log.Printf("session.New: %v", err)
	}

	err = repository.SaveOrder(order)

	if err != nil {
		log.Printf("session.New: %v", err)
	}

	return c.JSON(fiber.Map{
		"url": s.URL,
		"orderId": order.ID,
	})
}

func getParams (email string, shoppingCard *models.ShoppingCard, order *models.Order) *stripe.CheckoutSessionParams {
	var params *stripe.CheckoutSessionParams
	total := shoppingCard.Total
	subtotal := shoppingCard.Subtotal
	order.ShoppingCardID = shoppingCard.ID
	if email != "" {
		params = ParamsWithEmail(total, subtotal, email)
		order.Email = email
	} else {
		params = ParamsWithoutEmail(total, subtotal)
	}
	return params
}


func ParamsWithEmail(total float32, subtotal float32, email string) *stripe.CheckoutSessionParams {
	return &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		LineItems: GenerateItems(total, subtotal),
		CustomerEmail: stripe.String(email),
		Mode:          stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL:    stripe.String("http://localhost/?status=success"),
		CancelURL:     stripe.String("http://localhost/?status=cancel"),
		Metadata: map[string]string{
			"email":   email,
			"orderId": "chester",
		},
	}
}

func ParamsWithoutEmail(total float32, subtotal float32) *stripe.CheckoutSessionParams {
	return &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		LineItems: GenerateItems(total,subtotal),
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String("http://localhost/profile/?id=1"),
		CancelURL:  stripe.String("http://localhost/?status=success"),
		Metadata: map[string]string{
			"email":   "",
			"orderId": "chester",
		},
	}
}


func GenerateItems(total float32 , subtotal  float32) []*stripe.CheckoutSessionLineItemParams {
	return []*stripe.CheckoutSessionLineItemParams{
		{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("usd"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name: stripe.String("Subtotal"),
				},
				UnitAmount: stripe.Int64(int64(subtotal*100)),
			},
			Quantity: stripe.Int64(1),
		},
		{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("usd"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name: stripe.String("Total"),
				},
				UnitAmount: stripe.Int64(int64(total*100)),
			},
			Quantity: stripe.Int64(1),
		},
	}
}


