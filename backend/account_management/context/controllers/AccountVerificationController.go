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

	encrypted, err := service.GetAESEncrypted(code)

	if err != nil {
		return err
		
	}

	err = emailsender.SendEmailVerificationCode([]string{email}, code)

	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Please check your email for verification code",
		"code": encrypted,
	})
}


func VerifyCode (c *fiber.Ctx) error {
	encryptedCode := c.Params("encryptedcode")
	inserytedCode := c.Params("code")
	decryptedCode, err := service.GetAESDecrypted(encryptedCode)
	if  err != nil {
		return err
	}

	if string(decryptedCode) != inserytedCode {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid code",
		})
	}else{
		return c.Status(200).JSON(fiber.Map{
			"message": "Code verified",
		})
	}
}