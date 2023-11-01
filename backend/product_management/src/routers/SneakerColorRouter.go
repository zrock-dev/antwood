package routes

import (
	"antwood_team/product_management/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakerColors(server *fiber.App) {
	server.Post("/sneakercolor", controllers.InsertSneakerColor)
	server.Post("/sneakercolors", controllers.InsertManySneakerColors)
	server.Put("/sneakercolor/:id", controllers.EditSneakerColorById)
	server.Delete("/sneakercolor/:id", controllers.DeleteSneakerColorById)
}
