package service

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

func GenerateCode() string {
	code := ""
	for i := 0; i < 6; i++ {
		randomNumber, err := rand.Int(rand.Reader, big.NewInt(10))
		if err != nil {
			return ""
		}
		digit := randomNumber.Int64()
		code += fmt.Sprintf("%d", digit)
	}
	return code
}
