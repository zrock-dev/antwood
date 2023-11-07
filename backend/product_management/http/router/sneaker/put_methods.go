package sneaker

import (
	"ant-wood/product-management/app/models"
	"ant-wood/product-management/database/handlers"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func InitPutMethods(app *fiber.App) {
	sneakerPutMethods := app.Group("/sneaker").Group("/put")

	sneakerPutMethods.Put("/", modifySneakerById)

	sneakerPutMethods.Put("/name/", modifySneakerName)
	sneakerPutMethods.Put("/brand/", modifySneakerBrand)
	sneakerPutMethods.Put("/description/", modifySneakerDescription)
	sneakerPutMethods.Put("/promotion/", modifySneakerPromotion)

	sneakerPutMethods.Put("/price/", modifySneakerPrice)
	sneakerPutMethods.Put("/qualification/", modifySneakerQualification)
	sneakerPutMethods.Put("/quantity/", modifySneakerQuantity)
}

func modifySneakerById(c *fiber.Ctx) error {
	s := new(models.Sneaker)

	if err := c.BodyParser(s); err != nil {
		c.SendStatus(400)
		return c.SendString(err.Error())
	}

	if s.ID.IsZero() {
		c.SendStatus(400)
		return c.SendString(http.StatusText(400))
	}

	insertResult := handlers.ModifyEntireSneaker(s)

	c.SendStatus(201)
	return c.JSON(insertResult)

}

func modifySneakerName(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerName := GetFiberQueries(c)["name"]

	modifyNameResult, err := handlers.ModifySneakerName(sneakerId, newSneakerName)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(modifyNameResult)
}

func modifySneakerBrand(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerBrand := GetFiberQueries(c)["brand"]

	modifyBrandResult, err := handlers.ModifySneakerBrand(sneakerId, newSneakerBrand)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(modifyBrandResult)
}

func modifySneakerDescription(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerDescription := GetFiberQueries(c)["description"]

	modifyDescriptionResult, err := handlers.ModifySneakerDescription(sneakerId, newSneakerDescription)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(modifyDescriptionResult)
}

func modifySneakerPromotion(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerPromotion := GetFiberQueries(c)["promotion"]

	modifyPromotionResult, err := handlers.ModifySneakerPromotion(sneakerId, newSneakerPromotion)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(modifyPromotionResult)
}

func modifySneakerPrice(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerPrice := GetFiberQueries(c)["price"]

	intN, err := strconv.ParseInt(newSneakerPrice, 10, 32)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	modifyPriceResult, err := handlers.ModifySneakerPrice(sneakerId, int(intN))
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(modifyPriceResult)
}

func modifySneakerQualification(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerQualification := GetFiberQueries(c)["qualification"]

	intN, err := strconv.ParseInt(newSneakerQualification, 10, 32)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	modifyQualificationResult, err := handlers.ModifySneakerQualification(sneakerId, int(intN))
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(modifyQualificationResult)
}

func modifySneakerQuantity(c *fiber.Ctx) error {
	sneakerId := GetFiberQueries(c)["id"]
	newSneakerQuantity := GetFiberQueries(c)["quantity"]

	intN, err := strconv.ParseInt(newSneakerQuantity, 10, 32)
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	modifyQuantityResult, err := handlers.ModifySneakerQuantity(sneakerId, int(intN))
	if err != nil {
		c.SendStatus(404)
		return c.SendString(err.Error())
	}

	c.SendStatus(200)
	c.Type("json", "utf-8")
	return c.JSON(modifyQuantityResult)
}
