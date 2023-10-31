package controllers

import "github.com/gofiber/fiber/v2"

func CreateProducts(c *fiber.Ctx) error {
	return c.SendString("creating prodcuts")
}

func EditProductById(c *fiber.Ctx) error {
	id := c.Params("id")
	return c.SendString("edit product " + id)
}

func DeleteProductById(c *fiber.Ctx) error {
	id := c.Params("id")
	return c.SendString("delete product " + id)
}
