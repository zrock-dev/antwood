package router

import (
	"product_management/context/requests"

	"github.com/gofiber/fiber/v2"
)

func RouteCloudinary(server *fiber.App) {
	requests.LoadCloudinary()

	server.Delete("/cloudinary/:id", requests.DeleteImage)
}
