package router

import (
	"product_management/context/controllers/responses"

	"github.com/gofiber/fiber/v2"
)

func RouteFilter(server *fiber.App) {
	server.Get("/sneakers/filters/options", responses.SendSneakersFiltersOptions)
	server.Get("/sneakers/filters/products", responses.SendSneakersFilteredByPagination)
}
