package service

import (
	"account_management/app/models"
	"account_management/app/repository"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)



type Provider interface {
	Register(ctx *fiber.Ctx) (string,models.User,error)
	Login(ctx *fiber.Ctx) (string,models.User,error)
	Logout(accessToken string) (string , error)
	User(accessToken string)  (models.User,error) 
}



type SoleStyleProvider struct {}

func (s SoleStyleProvider) Register(ctx *fiber.Ctx) (string,models.User,error) {
	var data map[string]string

	if err := ctx.BodyParser(&data); err != nil {
		return  "", models.User{}, err
	}	

	var user models.User

	_, err := repository.FindUserByEmail(data["email"])

	if err == nil {
		return "", models.User{}, fiber.NewError(fiber.StatusConflict, "User already exists")
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user = models.User{
		Id:       primitive.NewObjectID(),
		Username:     data["username"],
		Email:    data["email"],
		Role: "user",
		Password: password,
		ProviderAuth: "solestyle-auth",
	}


	err = repository.InsertUser(user)

	if err != nil {
		ctx.Status(fiber.StatusInternalServerError)
		return  "", models.User{}, err
	}

	authentication_token, signError := GenerateAuthenticationToken(user.Id.Hex(), user.Email)

	if signError != nil {
		ctx.Status(fiber.StatusInternalServerError)
		return  "", models.User{}, signError
	}

	return authentication_token, user,nil
}


func (s SoleStyleProvider) Login(ctx *fiber.Ctx)(string,models.User,error) {
	var data map[string]string
	if err := ctx.BodyParser(&data); err != nil {
		return "", models.User{}, err
	}

	user,err := repository.FindUserByEmail(data["email"])

	if err != nil {
		return "", models.User{}, err	
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		ctx.Status(fiber.StatusBadRequest)
		return "Wrong password", models.User{}, err
	}

	authentication_token, signError := GenerateAuthenticationToken(user.Id.Hex(), user.Email)

	if signError != nil {
		ctx.Status(fiber.StatusInternalServerError)
		return  "", models.User{}, signError
	}

	return authentication_token, user,nil
}



func (s SoleStyleProvider) User(accessToken string) (models.User,error) {

	claims,err := GetStandardClaims(accessToken)
	if(err!= nil){
		return models.User{}, err
	}

	user, err := repository.FindUserByEmail(claims.Subject)

	if err != nil {
		return  models.User{}, err
	}

	return user, nil
}



func (s SoleStyleProvider) Logout( accessToken string ) (string , error) {
	return "", nil
}


func UseProvider(provider string) Provider {
	return SoleStyleProvider{}
}