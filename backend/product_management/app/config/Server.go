package config

import (
	"github.com/gofiber/fiber/v2"

	"product_management/app/database"
	routes "product_management/router"
)

var Server = fiber.New()
var serverPort = ":4000"

func RunServer() {
	database.ConnectToTheDatabase()
	routes.RouteHome(Server)
	routes.RouteSneakers(Server)
	routes.RouteSneakerColors(Server)
	Server.Listen(serverPort)
}
