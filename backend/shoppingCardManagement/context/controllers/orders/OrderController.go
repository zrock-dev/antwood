package orders

import (
	"shopping-card-management/app/repository"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetOrdersPageByUserEmail(c *fiber.Ctx) error {

	orderEmail := c.Params("email")
	pageSize, page := parseQueries(c.Query("pageSize"), c.Query("page"))

	orders, paginationErr := repository.GetOrderPageByUserEmail(orderEmail, page, pageSize)

	if paginationErr != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(paginationErr.Error())
	}

	total, totalErr := repository.GetOrderCountByEmail(orderEmail)
	if totalErr != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(totalErr.Error())
	}
	
	var totalPages int

	if total%pageSize != 0 {
		totalPages = total/pageSize + 1
	} else {
		totalPages = total / pageSize
	}
	
	
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"page":       page,
		"totalPages": totalPages,
		"pageSize":     pageSize,
		"total":      total,
		"orders":     orders,
		"status":     fiber.StatusOK,
	})
}

func parseQueries(pageSize string, page string) (int, int) {
	pageSizeInt, errPageSize := strconv.Atoi(pageSize)
	pageInt, errPage := strconv.Atoi(page)

	if errPageSize != nil || errPage != nil {
		return 10, 1
	}

	return pageSizeInt, pageInt
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
