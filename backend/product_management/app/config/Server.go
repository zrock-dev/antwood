package config

import (
	"product_management/app/database"
	"product_management/app/utils"
	routes "product_management/router"

	"github.com/gofiber/fiber/v2"
)

var Server = fiber.New()
var serverPort = ":4000"

func RunServer() {
	utils.LoadGodotenv()
	database.ConnectToTheDatabase()

	routes.RouteHome(Server)
	routes.RouteSneakers(Server)
	routes.RouteSneakerColors(Server)
	routes.RouteSearch(Server)
	routes.RouteCloudinary(Server)
	routes.RouteReview(Server)

	Server.Listen(serverPort)
}
