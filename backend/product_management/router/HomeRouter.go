package router

import "github.com/gofiber/fiber/v2"

func RouteHome(server *fiber.App) {
	server.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("AntWood - Main Page")
	})
}
