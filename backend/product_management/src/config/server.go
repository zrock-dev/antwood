package config

import (
	"github.com/gofiber/fiber/v2"
)

var Server = fiber.New()
var serverPort = ":4000"

func RunServer() {
	Server.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("main page")
	})
	Server.Listen(serverPort)
}
