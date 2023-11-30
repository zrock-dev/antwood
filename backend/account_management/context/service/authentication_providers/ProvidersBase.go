package authentication_providers

import (
	"account_management/app/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

type Provider interface {
	Register(ctx *fiber.Ctx) (string, models.User, error)
	Login(ctx *fiber.Ctx) (string, models.User, error)
	Logout(accessToken string) (string, error)
	GetUserByToken(accessToken string) (models.User, error)
}

func UseProvider(provider string) Provider {
	switch provider {
	case "solestyle":
		return ProviderSoleStyle{}
	default:
		log.Errorf("Specified provider %s could not be found, using solestyle instead", provider)
		return ProviderSoleStyle{}
	}
}
