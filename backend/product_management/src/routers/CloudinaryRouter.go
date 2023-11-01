package routes

import (
	"github.com/gofiber/fiber/v2"

	"antwood_team/product_management/src/controllers/requests"
)

func RouteCloudinary(server *fiber.App) {
	requests.LoadCloudinary()

	server.Delete("/cloudinary/:id", requests.DeleteImage)
}
