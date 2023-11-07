package sneaker

import (
	"ant-wood/product-management/app/models"
	"ant-wood/product-management/database/handlers"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func InitPostMethods(app *fiber.App) {
	sneakerPostMethods := app.Group("/sneaker").Group("/post")

	sneakerPostMethods.Post("/", createSneaker)
	sneakerPostMethods.Post("/tag/", insertSneakerTag)
}

func createSneaker(c *fiber.Ctx) error {
	s := new(models.Sneaker)

	if err := c.BodyParser(s); err != nil {
		c.SendStatus(400)
		return c.SendString(err.Error())
	}

	if !s.ID.IsZero() {
		c.SendStatus(400)
		return c.SendString(http.StatusText(400))
	}

	insertResult, err := handlers.InsertSneaker(s)
	if err != nil {
		c.SendStatus(404)
		c.SendString(err.Error())
	}

	c.SendStatus(201)
	return c.JSON(insertResult)
}

func insertSneakerTag(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerTag := GetFiberQueries(c)["tag"]

	insertTagResult, err := handlers.InsertNewTag(sneakerId, newSneakerTag)
	if err != nil {
		c.SendStatus(404)
		c.SendString(err.Error())
	}

	c.SendStatus(201)
	return c.JSON(insertTagResult)
}
