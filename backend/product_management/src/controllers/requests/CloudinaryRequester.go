package requests

import (
	"context"
	"os"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/gofiber/fiber/v2"
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
	wasDeleted := DeleteImageById(c.Params("id"))
	if !wasDeleted {
		return c.Status(500).SendString("Couldn't delete image")
	}
	return c.SendString("Image deleted successfully")
}

func DeleteImageById(imageId string) bool {
	_, err := Cld.Upload.Destroy(context.TODO(), uploader.DestroyParams{
		PublicID: imageId,
	})
	if err != nil {
		return false
	}

	return true
}
