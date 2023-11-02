package utils

import "github.com/joho/godotenv"

func LoadGodotenv() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
}
