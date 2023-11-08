package main

import (
	"ant-wood/product-management/app/utils"
	"ant-wood/product-management/http"
)

func main() {
	utils.LoadGodotenv()
	http.FiberApplication()
}
