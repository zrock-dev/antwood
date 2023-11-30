package main

import (
	"log"
	"shopping-card-management/app/database"
	"shopping-card-management/router"

	"github.com/dotenv-org/godotenvvault"
	"github.com/gofiber/fiber/v2"
)


func main (){
	uploadEnv()
	database.Connect()
	app := fiber.New()
	router.PaymentRoutes(app)
	app.Listen(":5000")
}

func uploadEnv() {
	err := godotenvvault.Load()
	if err != nil {
		log.Fatal("Error loading .env file")

	}
}
