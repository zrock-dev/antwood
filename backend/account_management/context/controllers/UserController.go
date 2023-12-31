package controllers

import (
	"account_management/app/models"
	"account_management/app/repository"

	"github.com/gofiber/fiber/v2"
)

func GetUserByEmail(c *fiber.Ctx) error {
	email := c.Params("email")
	var user models.User
	user, err := repository.FindUserByEmail(email)

	if err != nil {
		return c.Status(fiber.StatusOK).JSON(user)
	}

	return c.Status(fiber.StatusOK).JSON(user)
}

func GetUserById(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User
	user, err := repository.FindUserById(id)

	if err != nil {
		return c.Status(fiber.StatusForbidden).JSON(user)
	}
	return c.Status(fiber.StatusOK).JSON(user)
}

func ChangeUserRoleToAdmin(c *fiber.Ctx) error {
	m := c.Queries()
	email := m["email"]
	role := "admin"
	key := m["key"]
	APIKey := "admin123"

	if key != APIKey || email == "" || len(email) > 50 {
		return c.SendString("Invalid fields")
	}

	result, err := repository.ChangeUserRole(role, email)

	if err != nil {
		c.SendStatus(fiber.ErrBadRequest.Code)
		return c.JSON(err.Error())

	}

	return c.Status(fiber.StatusOK).JSON(result)
}

func ChangeUserRoleToUser(c *fiber.Ctx) error {
	m := c.Queries()
	email := m["email"]
	role := "user"
	key := m["key"]
	APIKey := "admin123"

	if key != APIKey || email == "" || len(email) > 50 {
		return c.SendString("Invalid fields")
	}

	result, err := repository.ChangeUserRole(role, email)

	if err != nil {
		c.SendStatus(fiber.ErrBadRequest.Code)
		return c.JSON(err.Error())

	}

	return c.Status(fiber.StatusOK).JSON(result)
}
