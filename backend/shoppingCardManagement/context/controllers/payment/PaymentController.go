package controllers

import (
	"log"
	"shopping-card-management/app/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/checkout/session"
	"github.com/stripe/stripe-go/v76/paymentintent"
)

func MakePayment(c *fiber.Ctx) error {
	stripe.Key = "sk_test_51NTGkfCzrx5SveTYwJEcMtEQHWLvHM2LKOIAOvURFKGrLtfh00UHfRdi0OJ6cDMTEqV74OkbCABVMozWgeLsIICD00HrPwVqb3"

	shoppingCard := models.NewShoppingCard()

	if err := c.BodyParser(&shoppingCard); err != nil {
		return c.Status(400).SendString("Invalid sneaker shopping data")
	}

	email := c.Query("email")
	order := models.NewOrder()

	params := getParams(email, shoppingCard, order)
	s, err := session.New(params)

	if err != nil {
		log.Printf("session.New: %v", err)
	}

	return c.JSON(fiber.Map{
		"sessionId": s.ID,
		"url":       s.URL,
		"orderId":   order.ID,
	})
}

func getParams(email string, shoppingCard *models.ShoppingCard, order *models.Order) *stripe.CheckoutSessionParams {
	var params *stripe.CheckoutSessionParams
	order.ShoppingCardID = shoppingCard.ID
	if email != "" {
		params = ParamsWithEmail(shoppingCard.Products, email)
		order.Email = email
	} else {
		params = ParamsWithoutEmail(shoppingCard.Products)
	}
	return params
}

func ParamsWithEmail(products []models.Product, email string) *stripe.CheckoutSessionParams {
	return &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		LineItems:     GenerateItems(products),
		CustomerEmail: stripe.String(email),
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String("http://localhost/?session_id={CHECKOUT_SESSION_ID}"),
		CancelURL:  stripe.String("http://localhost/?session_id={CHECKOUT_SESSION_ID}"),
		Metadata: map[string]string{
			"email":   email,
			"orderId": "chester",
		},
		ShippingAddressCollection: &stripe.CheckoutSessionShippingAddressCollectionParams{
			AllowedCountries: stripe.StringSlice([]string{"US", "CA", "GB", "DE", "FR", "AU", "JP", "BR", "MX", "CN","BO"}), 
		},
	}
}

func ParamsWithoutEmail(products []models.Product) *stripe.CheckoutSessionParams {
	return &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		LineItems: GenerateItems(products),
		Mode:      stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String("http://localhost/profile/?session_id={CHECKOUT_SESSION_ID}"),
		CancelURL:  stripe.String("http://localhost/profile/?session_id={CHECKOUT_SESSION_ID}"),
		Metadata: map[string]string{
			"email":   "",
			"orderId": "chester",
		},
		ShippingAddressCollection: &stripe.CheckoutSessionShippingAddressCollectionParams{
			AllowedCountries: stripe.StringSlice([]string{"US", "CA", "GB", "DE", "FR", "AU", "JP", "BR", "MX", "CN","BO"}), 
		},
	}
}

func GenerateItems(products []models.Product) []*stripe.CheckoutSessionLineItemParams {
	var items []*stripe.CheckoutSessionLineItemParams

	for _, product := range products {
		items = append(items, &stripe.CheckoutSessionLineItemParams{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("usd"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name:        stripe.String(product.Name),
					Images:      stripe.StringSlice([]string{product.Image}),
					Description: stripe.String(strconv.FormatFloat(float64(product.Size), 'f', -1, 32)),
				},
				UnitAmount: stripe.Int64(int64(product.Subtotal * 100)),
			},
			Quantity: stripe.Int64(int64(product.Amount)),
		})
	}
	return items
}

func SessionStatus(c *fiber.Ctx) error {
	stripe.Key = "sk_test_51NTGkfCzrx5SveTYwJEcMtEQHWLvHM2LKOIAOvURFKGrLtfh00UHfRdi0OJ6cDMTEqV74OkbCABVMozWgeLsIICD00HrPwVqb3"

	session_id := c.Query("session_id")
	params := &stripe.CheckoutSessionParams{}

	session, err := session.Get(session_id, params)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	response := struct {
		Status        string `json:"status"`
		PaymentStatus string `json:"payment_status"`
	}{
		Status:        string(session.Status),
		PaymentStatus: string(session.PaymentStatus),
	}
	return c.JSON(response)
}




func CreatePaymentIntent(c *fiber.Ctx) error {
	stripe.Key = "sk_test_51NTGkfCzrx5SveTYwJEcMtEQHWLvHM2LKOIAOvURFKGrLtfh00UHfRdi0OJ6cDMTEqV74OkbCABVMozWgeLsIICD00HrPwVqb3"

	var paymentPrices  map[string]float32;
	if err := c.BodyParser(&paymentPrices); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	  params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(paymentPrices["total"] * 100)),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
		  Enabled: stripe.Bool(true),
		},
	  }

	  pi, err := paymentintent.New(params)
	  log.Printf("pi.New: %v", pi.ClientSecret)

	
	  if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	  }
	
	
	  response := struct {
		ClientSecret string `json:"clientSecret"`
		IntentId     string `json:"intentId"`
	  }{
		ClientSecret: pi.ClientSecret,
		IntentId:     pi.ID,
	  }
	  return c.JSON(response)
	}
