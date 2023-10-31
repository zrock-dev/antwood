package config

import (
	"github.com/gofiber/fiber/v2"

	"antwood_team/product_management/src/database"
	routes "antwood_team/product_management/src/routers"
)

var Server = fiber.New()
var serverPort = ":4000"

func RunServer() {
	database.ConnectToTheDatabase()
	routes.RouteHome(Server)
	routes.RouteProducts(Server)
	Server.Listen(serverPort)
}
