package config

import (
	"github.com/gofiber/fiber/v2"

	"antwood_team/product_management/src/database"
	routes "antwood_team/product_management/src/routers"
	"antwood_team/product_management/src/utils"
)

var Server = fiber.New()
var serverPort = ":4000"

func RunServer() {
	utils.LoadGodotenv()
	database.ConnectToTheDatabase()

	routes.RouteHome(Server)
	routes.RouteSneakers(Server)
	routes.RouteSneakerColors(Server)
	routes.RouteCloudinary(Server)

	Server.Listen(serverPort)
}
