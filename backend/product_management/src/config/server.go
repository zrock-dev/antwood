package config

import (
	"antwood_team/product_management/src/database"

	"github.com/gofiber/fiber/v2"
)

var Server = fiber.New()
var serverPort = ":4000"

func RunServer() {
	database.ConnectToTheDatabase()
	Server.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("main page")
	})
	Server.Listen(serverPort)
}
