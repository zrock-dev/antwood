package main

import (
	"log"
	"shopping-card-management/router"

	"github.com/dotenv-org/godotenvvault"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)


func main (){
	uploadEnv()

	//database.Connect()
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))
	router.PaymentRoutes(app)
	app.Listen(":5000")
}

func uploadEnv() {
	err := godotenvvault.Load()
	if err != nil {
		log.Fatal("Error loading .env file")

	}
}
