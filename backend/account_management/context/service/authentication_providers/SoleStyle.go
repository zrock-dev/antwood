package authentication_providers

import (
	"account_management/app/models"
	"account_management/app/repository"
	"account_management/context/service"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type ProviderSoleStyle struct{}

func (s ProviderSoleStyle) Register(ctx *fiber.Ctx) (string, models.User, error) {
	var data map[string]string

	if err := ctx.BodyParser(&data); err != nil {
		return "", models.User{}, err
	}

	var user models.User

	_, err := repository.FindUserByEmail(data["email"])

	if err == nil {
		return "", models.User{}, fiber.NewError(fiber.StatusConflict, "User already exists")
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user = models.User{
		Id:           primitive.NewObjectID(),
		Username:     data["username"],
		Email:        data["email"],
		Role:         "user",
		Password:     password,
		ProviderAuth: "solestyle",
	}

	err = repository.InsertUser(user)

	if err != nil {
		ctx.Status(fiber.StatusInternalServerError)
		return "", models.User{}, err
	}

	authenticationToken, signError := service.GenerateAuthenticationToken(user.Id.Hex(), user.Email)

	if signError != nil {
		ctx.Status(fiber.StatusInternalServerError)
		return "", models.User{}, signError
	}

	return authenticationToken, user, nil
}

func (s ProviderSoleStyle) Login(ctx *fiber.Ctx) (string, models.User, error) {
	var data map[string]string
	if err := ctx.BodyParser(&data); err != nil {
		return "", models.User{}, err
	}

	user, err := repository.FindUserByEmail(data["email"])

	if err != nil {
		return "", models.User{}, err
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		ctx.Status(fiber.StatusBadRequest)
		return "Wrong password", models.User{}, err
	}

	authenticationToken, signError := service.GenerateAuthenticationToken(user.Id.Hex(), user.Email)

	if signError != nil {
		ctx.Status(fiber.StatusInternalServerError)
		return "", models.User{}, signError
	}

	ctx.Status(fiber.StatusOK)
	return authenticationToken, user, nil
}

func (s ProviderSoleStyle) GetUserByToken(accessToken string) (models.User, error) {
	claims, err := service.GetStandardClaims(accessToken)
	if err != nil {
		return models.User{}, err
	}

	user, err := repository.FindUserByEmail(claims.Subject)

	if err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (s ProviderSoleStyle) Logout(_ string) (string, error) {
	return "", nil
}
