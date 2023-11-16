package router

import (
	"github.com/gofiber/fiber/v2"
)

func PaymentRoutes (app *fiber.App) {
	
	app.Post("/api/payment", controllers.MakePayment)
	app.Post("/api/payment/webhook", controllers.HandleWebhook)
}