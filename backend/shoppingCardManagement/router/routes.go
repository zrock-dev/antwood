package router

import (
	"shopping-card-management/context/controllers"

	"github.com/gofiber/fiber/v2"
)

func PaymentRoutes (app *fiber.App) {
	
	app.Post("/api/payment", controllers.MakePayment)
}