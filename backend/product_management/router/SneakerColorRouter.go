package router

import (
	"product_management/context/controllers/requests"
	"product_management/context/controllers/responses"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakerColors(server *fiber.App) {

	server.Get("/sneakercolor/:id", responses.SendSneakerColorByID)
	server.Post("/sneakercolor", requests.InsertSneakerColor)
	server.Post("/sneakercolors", requests.InsertManySneakerColors)

	server.Put("/sneakercolor/:id", requests.UpdateSneakerColorById)

	server.Delete("/sneakercolor/:id", requests.DeleteSneakerColorById)
}
