package sneaker

import (
	"github.com/gofiber/fiber/v2"
)

func InitRouter(app *fiber.App) {
	InitGetMethods(app)
	InitPostMethods(app)
	InitPutMethods(app)
	InitDeleteMethods(app)
}

func GetFiberQueries(c *fiber.Ctx) map[string]string {
	return c.Queries()
}
