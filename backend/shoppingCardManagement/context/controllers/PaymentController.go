package controllers

import (
	"log"
	"shopping-card-management/app/models"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/checkout/session"
)


func MakePayment(c *fiber.Ctx) error {
	stripe.Key = "sk_test_51NTGkfCzrx5SveTYwJEcMtEQHWLvHM2LKOIAOvURFKGrLtfh00UHfRdi0OJ6cDMTEqV74OkbCABVMozWgeLsIICD00HrPwVqb3"

	var shoppingCard models.ShoppingCard	

	email := c.Query("email")
	onSuccessUrl := "http://localhost:3000"	
	onCancelUrl := "http://localhost:3000/?status=cancelled"
	
	if email != "" {
		onSuccessUrl+="/?status=success"
		}else{
		onSuccessUrl+="/profile"
	}

	if err := c.BodyParser(&shoppingCard); err != nil {
		return c.Status(400).SendString("Invalid sneaker shopping data")
	}

	total := shoppingCard.Total



	
	domain := ""
	params := &stripe.CheckoutSessionParams{
		LineItems: []*stripe.CheckoutSessionLineItemParams{
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
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("usd"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String("Subtotal"),
					},
					UnitAmount: stripe.Int64(int64(total*100)),
				},
				Quantity: stripe.Int64(1),
			},
		},
		Mode: stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String(domain + onSuccessUrl),
		CancelURL: stripe.String(domain + onCancelUrl),
	}


	s, err := session.New(params)

	if err != nil {
	  log.Printf("session.New: %v", err)
	
	}

	return c.JSON(fiber.Map{
		"url" : s.URL,
	})
}