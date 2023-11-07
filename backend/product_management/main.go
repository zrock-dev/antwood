package main

import (
	"ant-wood/product-management/app/utils"
	"ant-wood/product-management/database"
	"ant-wood/product-management/http"
	"context"
)

func main() {
	utils.LoadGodotenv()
	database.SneakersCollection().Drop(context.TODO())
	http.FiberApplication()
}
