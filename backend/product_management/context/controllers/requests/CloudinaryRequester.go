package requests

import (
	"os"

	"github.com/cloudinary/cloudinary-go"
	"github.com/gofiber/fiber/v2"
	"product_management/context/repository"
)

var Cld cloudinary.Cloudinary

func LoadCloudinary() {
	name := os.Getenv("CLOUDINARY_NAME")
	apiKey := os.Getenv("CLOUDINARY_API_KEY")
	apiSecrect := os.Getenv("CLOUDINARY_API_SECRECT")

	cld, _ := cloudinary.NewFromParams(name, apiKey, apiSecrect)
	Cld = *cld
}

func DeleteImage(c *fiber.Ctx) error {

	wasDeleted := repository.DeleteImageByPublicId(c.Query("id"))
	if !wasDeleted {
		return c.Status(500).SendString("Couldn't delete image")
	}
	return c.SendString("Image deleted successfully")
}