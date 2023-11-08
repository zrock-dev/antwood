package sneaker

import (
	"ant-wood/product-management/app/models"
	"ant-wood/product-management/database/handlers"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func InitGetMethods(app *fiber.App) {
	sneakerGetMethods := app.Group("/sneaker").Group("/get")

	sneakerGetMethods.Get("/", getSneakerById)
	sneakerGetMethods.Get("/page/", getSneakersPage)
}

func getSneakerById(c *fiber.Ctx) error {
	id := GetFiberQueries(c)["id"]

	sneakerFounded, err := handlers.FindSneaker(id)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(sneakerFounded)
}

func getSneakersPage(c *fiber.Ctx) error {
	pageSize := GetFiberQueries(c)["page-size"]
	pageIndex := GetFiberQueries(c)["page-index"]

	intS, err := strconv.ParseInt(pageSize, 10, 32)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	intI, err := strconv.ParseInt(pageIndex, 10, 32)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}
	
	results, err := handlers.GetRestaurantsPage(intS, intI)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	

	var d = new(models.PaginationResult)
	d.PageIndex = intS
	d.PageSize = intI
	d.Sneakers = results
	return c.JSON(d)
}
