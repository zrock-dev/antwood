package authentication_providers

import (
	"account_management/app/models"
	"account_management/context/service"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

func ParseAuthenticationToken(ctx *fiber.Ctx, user models.User) (string, models.User, error) {
	authenticationToken, err := service.GenerateAuthenticationToken(user.Id.Hex(), user.Email)
	if err != nil {
		log.Error(err)
		return "", models.User{}, InternalError(err, ctx, "Could not generate authentication token")
	}

	ctx.Status(fiber.StatusOK)
	return authenticationToken, user, nil
}
