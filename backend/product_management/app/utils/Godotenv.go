package utils

import "github.com/dotenv-org/godotenvvault"

func LoadGodotenv() {
	if err := godotenvvault.Load(); 
	err != nil {
		panic(err)
	}
}

