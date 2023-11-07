package sneaker

import (
	"ant-wood/product-management/database/handlers"

	"github.com/gofiber/fiber/v2"
)

func InitDeleteMethods(app *fiber.App) {
	sneakerDeleteMethods := app.Group("/sneaker").Group("/delete")
	sneakerDeleteMethods.Delete("/", deleteSneakerById)
}

func deleteSneakerById(c *fiber.Ctx) error {
	id := GetFiberQueries(c)["id"]

	deletionResult, err := handlers.DeleteSneakerFromID(id)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(deletionResult)
}
