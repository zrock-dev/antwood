package controllers

import "github.com/gofiber/fiber/v2"

func InsertSneakerColor(c *fiber.Ctx) error {
	return c.SendString("inserting sneaker color")
}

func InsertManySneakerColors(c *fiber.Ctx) error {
	return c.SendString("inserting sneaker colors")
}

func EditSneakerColorById(c *fiber.Ctx) error {
	return c.SendString("edit sneaker color " + c.Params("id"))
}

func DeleteSneakerColorById(c *fiber.Ctx) error {
	return c.SendString("delete sneaker color " + c.Params("id"))
}
