package routes

import (
	"antwood_team/product_management/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func RouteProducts(server *fiber.App) {
	server.Post("/products", controllers.CreateProducts)
	server.Put("/product/:id", controllers.EditProductById)
	server.Delete("/product/:id", controllers.DeleteProductById)
}
