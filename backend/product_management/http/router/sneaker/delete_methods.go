package sneaker

import (
	"ant-wood/product-management/database/handlers"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func InitDeleteMethods(app *fiber.App) {
	sneakerDeleteMethods := app.Group("/sneaker").Group("/delete")
	sneakerDeleteMethods.Delete("/", deleteSneakerById)
}

func deleteSneakerById(c *fiber.Ctx) error {
	id := GetFiberQueries(c)["id"]


	sneakerFounded, err	:=handlers.FindSneaker(id)

	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}
	fmt.Println(sneakerFounded)

	for _, sneakerColor := range sneakerFounded.Colors {
		if err != nil {
			c.SendStatus(404)
			return c.SendString(err.Error())
		}
		wasDeleted, _ :=handlers.DeleteShoeColorWithCloudDeps(sneakerColor.ID)

		if(!wasDeleted){
			c.SendStatus(404)
			return c.SendString("Error deleting sneaker color")
		}
	}

	deletionResult, err := handlers.DeleteSneakerFromID(id)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}



	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(deletionResult)
}