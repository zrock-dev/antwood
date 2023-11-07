package http

import (
	sneakerRouter "ant-wood/product-management/http/router/sneaker"
	"ant-wood/product-management/http/utils"
	"log"

	"github.com/gofiber/fiber/v2"
)

func FiberApplication() {
	app := fiber.New(*utils.FiberConfig())

	sneakerRouter.InitRouter(app)
	log.Fatal(app.Listen(":3000"))
}
