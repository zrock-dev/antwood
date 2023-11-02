package router

import (
	"product_management/context/controllers"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakers(server *fiber.App) {
	server.Post("/sneaker", controllers.InsertSneaker)
	server.Put("/sneaker/:id", controllers.EditSneakerById)
	server.Delete("/sneaker/:id", controllers.DeleteSneakerById)
}
