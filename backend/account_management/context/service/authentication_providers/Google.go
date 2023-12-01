package authentication_providers

import (
	"account_management/app/models"
	"account_management/app/repository"
	"account_management/context/service"
	"errors"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProviderGoogle struct{}

func (e ProviderGoogle) Register(ctx *fiber.Ctx) (string, models.User, error) {
	userData, err := ObtainUserData(ctx)
	if err != nil {
		log.Error(err)
		return "", models.User{}, BadRequest(err, ctx)
	}

	var user models.User

	user, err = repository.FindUserByEmail(userData.Email)
	if err != nil {
		log.Error(err)
		if errors.Is(err, mongo.ErrNoDocuments) {
			user = models.User{
				Id:           primitive.NewObjectID(),
				Username:     fmt.Sprintf("%s %s", userData.GivenName, userData.FamilyName),
				Email:        userData.Email,
				Role:         "user",
				Password:     nil,
				ProviderAuth: "google",
			}

			if repository.InsertUser(user) != nil {
				log.Error(err)
				return "", models.User{}, InternalError(err, ctx, fmt.Sprintf("Could not insert user email: %s", user.Email))
			}

		} else {
			return "", models.User{}, InternalError(err, ctx, fmt.Sprintf("Could not find user email: %s", user.Email))
		}
	}

	return ParseAuthenticationToken(ctx, user)
}

func (e ProviderGoogle) Login(ctx *fiber.Ctx) (string, models.User, error) {
	userData, err := ObtainUserData(ctx)
	if err != nil {
		log.Error(err)
		return "", models.User{}, BadRequest(err, ctx)
	}

	user, err := repository.FindUserByEmail(userData.Email)
	if err != nil {
		log.Error(err)
		return "", models.User{}, InternalError(err, ctx, fmt.Sprintf("Could not find user email: %s", user.Email))
	} else {
		return ParseAuthenticationToken(ctx, user)
	}
}

func (e ProviderGoogle) Logout(_ string) (string, error) {
	return "", nil
}

func (e ProviderGoogle) GetUserByToken(accessToken string) (models.User, error) {
	claims, err := service.GetStandardClaims(accessToken)
	if err != nil {
		log.Error(err)
		return models.User{}, err
	}

	user, err := repository.FindUserByEmail(claims.Subject)
	if err != nil {
		log.Error(err)
		return models.User{}, err
	}

	return user, nil
}
