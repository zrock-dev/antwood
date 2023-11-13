package service

import (
	"account_management/context/records"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
)

var secretKey = []byte("mi_clave_secreta")

func GenerateAuthenticationToken(userid string, email string) (string, error) {
	claims := jwt.StandardClaims{
		ID:        userid,
		Subject:   email,
		Issuer:    "solestyle-auth",
		ExpiresAt: jwt.NewTime(float64(time.Now().Add(time.Hour * 24 * 7).Unix())),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &claims)

	signedToken, signError := token.SignedString(secretKey)

	if signError != nil {
		return "", signError
	}

	return signedToken, nil
}

func GetStandardClaims(accessToken string) (*jwt.StandardClaims, error) {
	token, err := jwt.ParseWithClaims(accessToken, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims := token.Claims.(*jwt.StandardClaims)
	return claims, nil
}

func GetAppClaims(authTocken string) (*jwt.MapClaims, error) {
	token, err := jwt.ParseWithClaims(authTocken, &jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims := token.Claims.(*jwt.MapClaims)
	return claims, nil
}

func GenerateAuthorizationToken(payload records.Payload) (string, error) {
	claims := jwt.MapClaims{
		"id":          payload.Id,
		"role":        payload.Role,
		"provider":    payload.Provider,
		"accessToken": payload.AuthToken,
		"exp":         jwt.NewTime(float64(time.Now().Add(time.Hour * 24 * 7).Unix())),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &claims)

	signedToken, signError := token.SignedString(secretKey)
	if signError != nil {
		return "", signError
	}
	return signedToken, nil
}
