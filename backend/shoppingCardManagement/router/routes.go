package router

import (
	payment "shopping-card-management/context/controllers/payment"
	webhandlers "shopping-card-management/context/controllers/webhandlers"

	"github.com/gofiber/fiber/v2"
)

func PaymentRoutes (app *fiber.App) {
	app.Get("/api/payment/session_status", payment.SessionStatus)
	app.Post("/api/payment", payment.MakePayment)
	app.Post("/api/payment/webhook", webhandlers.HandleWebhook)
	app.Post("/api/payment/create-payment-intent", payment.CreatePaymentIntent)
}