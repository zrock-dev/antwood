package controllers

import (
	"account_management/context/service"
	"account_management/context/service/emailsender"

	"github.com/gofiber/fiber/v2"
)


func VerifyAccount(c *fiber.Ctx) error {
	email := c.Params("email")

	code := service.GenerateCode()

	encrypted, err := service.GetAESEncrypted(code)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	err = emailsender.SendEmailVerificationCode([]string{email}, code)

	if err != nil {
		return c.JSON(fiber.Map{
			"status": fiber.StatusForbidden,
			"message": "Invalid email",
		})
		
	}

	return c.JSON(fiber.Map{
		"status": fiber.StatusOK,
		"message": "Please check your email for verification code",
		"code": encrypted,
	})
}


func VerifyCode (c *fiber.Ctx) error {
	encryptedCode := c.Query("encryptedcode")
	inserytedCode := c.Query("code")
	decryptedCode, err := service.GetAESDecrypted(encryptedCode)

	if  err != nil {
		return err
	}

	if string(decryptedCode) != inserytedCode {
		return c.Status(200).JSON(fiber.Map{
			"message": "Invalid code",
			"status":false,
		})
	}else{
		return c.Status(200).JSON(fiber.Map{
			"message": "Code verified",
			"status":true,
		})
	}
}