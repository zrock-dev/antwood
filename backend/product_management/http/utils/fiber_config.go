package utils

import "github.com/gofiber/fiber/v2"

func FiberConfig() *fiber.Config {
	return &fiber.Config{
		AppName:       "Go-Mongo v.1.1",
		CaseSensitive: true,
		StrictRouting: true,
	}
}
