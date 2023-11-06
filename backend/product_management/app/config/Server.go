package config

import (
	"product_management/app/database"
	"product_management/app/utils"
	routes "product_management/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)


var Server =fiber.New(fiber.Config{BodyLimit: 2 * 1024 * 1024, DisableStartupMessage: false})
var serverPort = ":4000"

func RunServer() {
	utils.LoadGodotenv()
	database.ConnectToTheDatabase()
	
	Server.Use(cors.New())
	routes.RouteHome(Server)
	routes.RouteSneakers(Server)
	routes.RouteSneakerColors(Server)
	routes.RouteCloudinary(Server)

	Server.Listen(serverPort)
}
