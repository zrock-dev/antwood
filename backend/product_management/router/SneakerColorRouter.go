package router

import (
	"product_management/context/controllers"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakerColors(server *fiber.App) {
	server.Post("/sneakercolor", controllers.InsertSneakerColor)
	server.Post("/sneakercolors", controllers.InsertManySneakerColors)
	server.Put("/sneakercolor/:id", controllers.EditSneakerColorById)
	server.Delete("/sneakercolor/:id", controllers.DeleteSneakerColorById)
}
