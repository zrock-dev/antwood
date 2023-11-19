package router

import (
	"product_management/context/controllers/responses"

	"github.com/gofiber/fiber/v2"
)

func RouteSearch(server *fiber.App) {
	server.Get("/sneakers/search/suggestions", responses.SendSearchSuggestions)
}
