package routes

import (
	"antwood_team/product_management/src/controllers/requests"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakers(server *fiber.App) {
	server.Post("/sneaker", requests.InsertSneaker)

	server.Put("/sneaker/:id", requests.UpdateSneakerById)

	server.Delete("/sneaker/:id", requests.DeleteSneakerById)
	server.Delete("/sneaker/color/:id/:idcolor", requests.RemoveSneakerColor)
}
