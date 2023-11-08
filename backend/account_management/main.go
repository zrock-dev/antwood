package main

import (
	"account_management/app/database"
	"account_management/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	uploadEnv()
	
	database.Connect()
	app := fiber.New()
	app.Use(cors.New())
	routes.AuthRoutes(app)
	app.Listen(":4500")
}

func uploadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}