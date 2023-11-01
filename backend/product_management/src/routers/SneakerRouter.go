package routes

import (
	"antwood_team/product_management/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakers(server *fiber.App) {
	server.Post("/sneaker", controllers.InsertSneaker)

	server.Put("/sneaker/:id", controllers.UpdateSneakerById)

	server.Delete("/sneaker/:id", controllers.DeleteSneakerById)
	server.Delete("/sneaker/color/:id/:idcolor", controllers.RemoveSneakerColor)
}
