package authentication_providers

import "github.com/gofiber/fiber/v2"

func BadRequest(err error, ctx *fiber.Ctx) error {
	return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
		"error": err,
	})
}
func InternalError(err error, ctx *fiber.Ctx, message string) error {
	return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"message": message,
		"error":   err,
	})
}
