package orders

import (
	"shopping-card-management/app/repository"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetOrdersByUserEmail(c *fiber.Ctx) error {

	email := c.Params("email")

	orders, err := repository.GetOrdersByUserEmail(email)

	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
			"orders":  orders,
			"status":  fiber.StatusInternalServerError,
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
		"orders":  orders,
		"status":  fiber.StatusOK,
	})
}

func UserAlreadyPurchaseSneaker(c *fiber.Ctx) error {
	email := c.Params("email")
	sneakerID := c.Params("sneaker")

	objectID, err := primitive.ObjectIDFromHex(sneakerID)

	orders, err := repository.UserAlreadyOrderSneaker(email, objectID)

	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
			"status":  fiber.StatusInternalServerError,
		})
	}

	return c.JSON(orders)
}
