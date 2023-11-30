package controllers

import (
	"log"
	"os"
	"strconv"

	"shopping-card-management/app/models"
	"shopping-card-management/app/repository"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/paymentintent"
	"github.com/stripe/stripe-go/v76/tax/calculation"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreatePaymentIntent(c *fiber.Ctx) error {
	stripe.Key = "sk_test_51OCWLLAx0MjRmRXcKRpa1l8BHpfWWOgABHD3618tkI2hQYTAasIbXwMsrZ0p5uYcbJaAVEy7qbfkSr5HfMZvqLVD00OkKmfBWA"
	email := c.Params("email")
	order := models.NewOrder()
	if err := c.BodyParser(&order); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	taxParams := &stripe.TaxCalculationParams{
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		LineItems: []*stripe.TaxCalculationLineItemParams{
			{
				Amount:    stripe.Int64(int64(order.Subtotal * 100)),
				Reference: stripe.String(order.ID.Hex()),
			},
		},
		CustomerDetails: &stripe.TaxCalculationCustomerDetailsParams{
			Address: &stripe.AddressParams{
				Line1:      stripe.String(order.Shipping.Address.Line1),
				City:       stripe.String(order.Shipping.Address.City),
				State:      stripe.String(order.Shipping.Address.State),
				PostalCode: stripe.String(order.Shipping.Address.PostalCode),
				Country:    stripe.String(order.Shipping.Address.Country),
			},
			AddressSource: stripe.String(string(stripe.TaxCalculationCustomerDetailsAddressSourceShipping)),
		},
	}
	result, _ := calculation.New(taxParams)

	order.Extra = float32(result.TaxAmountExclusive)
	order.Total = float32(result.AmountTotal)

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

	params.AddMetadata("tax_calculation", result.ID)

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

	extra := strconv.FormatFloat(float64(order.Extra), 'f', -1, 32)

	response := struct {
		ClientSecret string `json:"clientSecret"`
		OrderId      string `json:"orderId"`
		Tax          string `json:"tax"`
	}{
		ClientSecret: pi.ClientSecret,
		OrderId:      order.ID.Hex(),
		Tax:          extra,
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
			"message": err.Error(),
			"status":  fiber.StatusInternalServerError,
		})
	}

	metadata := paymentintentRes.Metadata
	orderId := metadata["orderId"]

	orderObjId, err := primitive.ObjectIDFromHex(orderId)

	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
			"status":  fiber.StatusInternalServerError,
		})
	}

	_, err = repository.UpdateUnpaidOrderPaidById(orderObjId.Hex(), "paid")

	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
			"status":  fiber.StatusForbidden,
		})
	}

	order, err := repository.FindOUnpaidrderById(orderObjId)

	if err != nil {

		return c.JSON(fiber.Map{
			"message": err.Error(),
			"status":  fiber.StatusForbidden,
		})
	}

	if order.Paid == "paid" && status == "succeeded" {
		err = repository.DeleteUnpaidOrderById(orderId)

		if err != nil {
			return c.JSON(fiber.Map{
				"message": err.Error(),
				"status":  fiber.StatusForbidden,
			})
		}
		return c.JSON(fiber.Map{
			"message": "Payment success",
			"status":  fiber.StatusOK,
		})

	} else {
		return c.JSON(fiber.Map{
			"message": "Error with payment status",
			"status":  fiber.StatusBadRequest,
		})
	}
}
