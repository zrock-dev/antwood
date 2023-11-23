package orders

import (
	"shopping-card-management/app/repository"

	"github.com/gofiber/fiber/v2"
)


func GetOrdersByUserEmail(c *fiber.Ctx) error{
	
	email := c.Params("email")

	orders , err := repository.GetOrdersByUserEmail(email)


	if err != nil {
		return c.JSON(fiber.Map{
			"message" : err.Error(),
			"orders" : orders,
			"status" : fiber.StatusInternalServerError,
		})
	}

	return c.JSON(fiber.Map{
		"message" : "success",
		"orders": orders,
		"status" : fiber.StatusOK,
	})
}
