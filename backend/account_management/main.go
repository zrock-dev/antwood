package main

import (
	"account_management/app/database"
	"account_management/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/dotenv-org/godotenvvault"
)

func main() {
	uploadEnv()
	
	database.Connect()
	app := fiber.New()
	app.Static("/public", "./public")
	routes.AuthRoutes(app)
	app.Listen(":4500")
}

func uploadEnv() {
	err := godotenvvault.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
// application should panic 
	}
}
