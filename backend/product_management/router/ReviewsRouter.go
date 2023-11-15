package router

import (
	"product_management/context/controllers/requests"
	"product_management/context/controllers/responses"

	"github.com/gofiber/fiber/v2"
)

func RouteReview(server *fiber.App) {

	server.Post("/review/:sneakerid", requests.InsertReview)
	server.Get("/review/:sneakerid", responses.SendReviewsByIndex)
	server.Get("/review/user/:sneakerid/:useremail", responses.SendReviewsByUserEmail)
}
