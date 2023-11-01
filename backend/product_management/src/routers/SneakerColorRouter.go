package routes

import (
	"antwood_team/product_management/src/controllers"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakerColors(server *fiber.App) {
	server.Post("/sneakercolor", controllers.InsertSneakerColor)
	server.Post("/sneakercolors", controllers.InsertManySneakerColors)
	server.Put("/sneakercolor/:id", controllers.UpdateSneakerColorById)
	server.Put("/sneakercolor/image/:id", controllers.AddNewImageToSneakerColor)
	server.Delete("/sneakercolor/:id", controllers.DeleteSneakerColorById)
	server.Delete("/sneakercolor/image/:id", controllers.DeleteSneakerColorImage)
}
