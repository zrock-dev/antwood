package config

import (
	"product_management/app/database"
	"product_management/app/utils"
	routes "product_management/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var Server = fiber.New()
var serverPort = ":4000"

func RunServer() {
	Server.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	utils.LoadGodotenv()
	database.ConnectToTheDatabase()

	routes.RouteHome(Server)
	routes.RouteSneakers(Server)
	routes.RouteSneakerColors(Server)
	routes.RouteCloudinary(Server)
	routes.RouteReview(Server)

	Server.Listen(serverPort)
}
