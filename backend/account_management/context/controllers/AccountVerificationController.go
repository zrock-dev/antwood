package controllers

import (
	"account_management/context/service"
	"account_management/context/service/emailsender"
	"fmt"

	"github.com/gofiber/fiber/v2"
)


func VerifyAccount(c *fiber.Ctx) error {
	email := c.Params("email")

	code := service.GenerateCode()

	err := emailsender.SendEmailVerificationCode([]string{email}, code)

	fmt.Println(err)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Please check your email for verification code",
		"code": code,
	})
}