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
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))
	app.Static("/public", "./public")
	routes.AuthRoutes(app)
	app.Listen(":4500")
}

func uploadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}