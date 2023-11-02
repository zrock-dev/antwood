package router

import (
	"product_management/context/controllers/requests"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakerColors(server *fiber.App) {
	server.Post("/sneakercolor", requests.InsertSneakerColor)
	server.Post("/sneakercolors", requests.InsertManySneakerColors)

	server.Put("/sneakercolor/:id", requests.UpdateSneakerColorById)
	server.Put("/sneakercolor/image/:id", requests.AddNewImageToSneakerColor)

	server.Delete("/sneakercolor/:id", requests.DeleteSneakerColorById)
	server.Delete("/sneakercolor/image/:id/:imageid", requests.DeleteSneakerColorImage)
}
