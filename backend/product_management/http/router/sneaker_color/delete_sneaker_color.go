package sneakercolor

import (
	"ant-wood/product-management/database"
	"ant-wood/product-management/database/handlers"

	"github.com/gofiber/fiber"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func InitDeleteMethods(app *fiber.App) {
	sneakerColorDeleteMethods := app.Group("/sneaker").Group("/delete")
	sneakerColorDeleteMethods.Delete("/sneakercolor/:id", deleteSneakerColor)
}

func deleteSneakerColor(c *fiber.Ctx) error {
	id,_ := primitive.ObjectIDFromHex(c.Params("id"))
	
	deletionColorResult, err := handlers.DeleteSneakerColorById(id)

	if err != nil {
		c.SendStatus(404)
		return nil
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(deletionColorResult)
}