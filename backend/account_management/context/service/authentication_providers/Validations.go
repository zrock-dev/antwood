package authentication_providers

import (
	"context"
	"errors"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"google.golang.org/api/idtoken"
)

type ResponseCookies struct {
	Csrf string `cookie:"g_csrf_token"`
}

type ResponseBody struct {
	Credential string `form:"credential"`
	Token      string `form:"g_csrf_token"`
}

type UserData struct {
	GivenName  string ""
	FamilyName string ""
	Email      string ""
}

func TokenValidation(c *fiber.Ctx) (*ResponseBody, error) {
	responseCookies := new(ResponseCookies)
	if err := c.CookieParser(responseCookies); err != nil {
		log.Error(err)
		return nil, err
	}

	responseBody := new(ResponseBody)
	if err := c.BodyParser(responseBody); err != nil {
		log.Error(err)
		return nil, err
	}

	if responseBody.Credential == "" {
		return nil, errors.New("credentials is empty")
	}

	return responseBody, nil
}

func ObtainUserData(ctx *fiber.Ctx) (*UserData, error) {
	responseBody, err := TokenValidation(ctx)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	validator, err := idtoken.NewValidator(context.Background())
	if err != nil {
		log.Error(err)
		return nil, err
	}
	payload, err := validator.Validate(context.Background(), responseBody.Credential, "")
	if err != nil {
		log.Error(err)
		return nil, err
	}

	userData := new(UserData)
	userData.GivenName = fmt.Sprintf("%s", payload.Claims["given_name"])
	userData.Email = fmt.Sprintf("%s", payload.Claims["email"])
	userData.FamilyName = fmt.Sprintf("%s", payload.Claims["family_name"])

	return userData, nil
}
