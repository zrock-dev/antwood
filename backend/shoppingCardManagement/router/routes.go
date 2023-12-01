package router

import (
	orders "shopping-card-management/context/controllers/orders"
	payment "shopping-card-management/context/controllers/payment"
	webhandlers "shopping-card-management/context/controllers/webhandlers"

	"github.com/gofiber/fiber/v2"
)

func PaymentRoutes(app *fiber.App) {
	app.Post("/api/payment/webhook", webhandlers.HandleWebhook)
	app.Post("/api/payment/create-payment-intent/:email", payment.CreatePaymentIntent)
	app.Put("/api/payment/orders/:paymentintentid/:status", payment.HandlePaymentStatus)
	app.Get("/api/payment/orders/taxes/:amount/:taxcode", payment.HandleCountryTaxes)

	app.Get("/api/payment/orders/:email", orders.GetOrdersPageByUserEmail)
	app.Get("/api/payment/orders/cancomment/:email/:sneaker", orders.UserAlreadyPurchaseSneaker)
}
