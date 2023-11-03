package router

import (
	"product_management/context/controllers/requests"

	"github.com/gofiber/fiber/v2"
)

func RouteCloudinary(server *fiber.App) {
	requests.LoadCloudinary()
	server.Post("/cloudinary/:id/:brand", requests.UploadImage)
	server.Delete("/cloudinary", requests.DeleteImage)
}
