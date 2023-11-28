package router

import (
	"product_management/context/controllers/requests"
	"product_management/context/controllers/responses"

	"github.com/gofiber/fiber/v2"
)

func RouteSneakers(server *fiber.App) {
	server.Get("/sneakers", responses.SendSneakersByPagination)
	server.Get("/sneaker/:id", responses.SendSneakerByID)
	server.Get("/sneakers/colors/:sneakerId/:sneakerColorId", responses.SendColorRelatedProduct)
	server.Get("/check-sneaker-existence/:id", responses.CheckSneakerExistence)
	server.Get("/sneaker/quantity/:id", responses.SendSneakerAvgQuantity)



	server.Post("/sneakers/colors/all", responses.SendColorRelatedProducts)
	server.Post("/sneakers/quantities", responses.SendSneakerQuantities)
	server.Post("/sneaker", requests.InsertSneaker)

	server.Put("/sneaker/:id", requests.UpdateSneakerById)
	server.Put("/sneakers/quantities", requests.UpdateSneakerQuantities)
	server.Put("/sneakers/confirm/quantities", requests.ConfirmAvailableSneakersQuantities)
	
	server.Delete("/sneaker/:id", requests.DeleteSneakerById)
	server.Delete("/sneaker/color/:id/:idcolor", requests.RemoveSneakerColor)
}
