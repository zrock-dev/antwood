package routes

import (
	"account_management/context/controllers"
	"github.com/gofiber/fiber/v2")


func AuthRoutes(app *fiber.App) {
	app.Post("/auth/register", controllers.Register)
	app.Post("/auth/login", controllers.Login)



	app.Get("/auth/logout", controllers.Logout)
	app.Get("/auth/user", controllers.GetUserByToken)
	app.Get("/auth/user/:email", controllers.GetUserByEmail)
	app.Get("/auth/verify-account/:email", controllers.VerifyAccount)
	app.Get("/auth/verify-code", controllers.VerifyCode)
}