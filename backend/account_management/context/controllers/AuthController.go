package controllers

import (
	"account_management/context/records"
	"account_management/context/service"

	"github.com/gofiber/fiber/v2"

	"time"
)

func Register(c *fiber.Ctx) error {
	
	authProvider := service.UseProvider(c.Query("provider"))

	authentication_token, user , authError:= authProvider.Register(c)

	if authError != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"error": authError.Error(),
		})
	}

	authorizarion_token, signError := service.GenerateAuthorizationToken(records.Payload{
		Id: user.Id.Hex(),
		Role: user.Role,
		Provider: user.ProviderAuth,
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
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(user)
}






func Login(c *fiber.Ctx) error {
	authProvider := service.UseProvider(c.Query("provider"))

	authentication_token, user ,authError:= authProvider.Login(c)

	if authError != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"error": authError.Error(),
		})
	}

	authorizarion_token, signError := service.GenerateAuthorizationToken(records.Payload{
		Id: user.Id.Hex(),
		Role: user.Role,
		Provider: user.ProviderAuth,
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
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(user)
}



func User(c *fiber.Ctx) error {
	authProvider := service.UseProvider(c.Query("provider"))

	authTocken := c.Cookies("jwt")

	claims ,authError := service.GetAppClaims(authTocken)

	if authError != nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"error": authError.Error(),
		})
	}

	accessToken := (*claims)["accessToken"].( string)

	user,userError := authProvider.User(accessToken)

	if userError!= nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"error": userError.Error(),
		})
	}

	return c.JSON(user)

}

func Logout(c *fiber.Ctx) error {
	authProvider := service.UseProvider("solestyle")

	authTocken := c.Cookies("jwt")

	claims ,authError := service.GetAppClaims(authTocken)

	if authError != nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"error": authError.Error(),
		})
	}

	accessToken := (*claims)["accessToken"].( string)

	_, err := authProvider.Logout(accessToken)

	if err != nil {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour*24*7),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success logout",
	})

}
