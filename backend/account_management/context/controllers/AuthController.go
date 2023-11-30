package controllers

import (
	"account_management/context/records"
	"account_management/context/service"
	"account_management/context/service/authentication_providers"

	"github.com/gofiber/fiber/v2"

	"time"
)

func Register(c *fiber.Ctx) error {
	authProvider := authentication_providers.UseProvider(c.Query("provider"))

	authentication_token, user, authError := authProvider.Register(c)

	if authError != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"error": authError.Error(),
		})
	}

	authorizarion_token, signError := service.GenerateAuthorizationToken(records.Payload{
		Id:        user.Id.Hex(),
		Role:      user.Role,
		Provider:  user.ProviderAuth,
		AuthToken: authentication_token,
	})

	if signError != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"error": signError.Error(),
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    authorizarion_token,
		Expires:  time.Now().Add(time.Hour * 24 * 7),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.Status(fiber.StatusOK).JSON(user)
}

func Login(c *fiber.Ctx) error {
	authProvider := authentication_providers.UseProvider(c.Query("provider"))

	authentication_token, user, authError := authProvider.Login(c)

	if authError != nil {
		c.Status(fiber.StatusOK)
		return c.JSON(fiber.Map{
			"error": authError.Error(),
		})
	}

	authorizarion_token, signError := service.GenerateAuthorizationToken(records.Payload{
		Id:        user.Id.Hex(),
		Role:      user.Role,
		Provider:  user.ProviderAuth,
		AuthToken: authentication_token,
	})

	if signError != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"error": signError.Error(),
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    authorizarion_token,
		Expires:  time.Now().Add(time.Hour * 24 * 7),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.Status(fiber.StatusOK).JSON(user)
}

func GetUserByToken(c *fiber.Ctx) error {
	authProvider := authentication_providers.UseProvider(c.Query("provider"))

	authToken := c.Cookies("jwt")

	claims, authError := service.GetAppClaims(authToken)

	if authError != nil {
		return c.JSON(fiber.Map{
			"status": fiber.StatusForbidden,
			"error":  authError.Error(),
		})
	}

	accessToken := (*claims)["accessToken"].(string)

	user, userError := authProvider.GetUserByToken(accessToken)

	if userError != nil {
		return c.JSON(fiber.Map{
			"status": fiber.StatusForbidden,
			"error":  userError.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(user)

}

func Logout(c *fiber.Ctx) error {
	authProvider := authentication_providers.UseProvider(c.Query("provider"))
	authToken := c.Cookies("jwt")

	claims, authError := service.GetAppClaims(authToken)

	if authError != nil {
		return c.JSON(fiber.Map{
			"status": fiber.StatusForbidden,
			"error": authError.Error(),
		})
	}

	accessToken := (*claims)["accessToken"].(string)

	_, err := authProvider.Logout(accessToken)

	if err != nil {
		return c.JSON(fiber.Map{
			"status": fiber.StatusForbidden,
			"error": err.Error(),
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour * 24 * 7),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"status": fiber.StatusOK,
		"message": "success logout",
	})

}

