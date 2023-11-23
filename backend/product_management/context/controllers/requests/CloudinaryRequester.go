package requests

import (
	"context"
	"log"
	"mime/multipart"
	"os"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
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


func UploadImage(file *multipart.FileHeader, brand string) (*uploader.UploadResult, error) {
	LoadCloudinary() 
	var id = primitive.NewObjectID()
	return UploadToCloudinary(file, "solestyle/product_images/"+brand+"/"+id.Hex())
}


func UploadToCloudinary(file *multipart.FileHeader, path string) (*uploader.UploadResult, error) {
	uploadParams := uploader.UploadParams{
		PublicID: path,
	}
	fileContent, err := file.Open()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer fileContent.Close()

	uploadResult, err := Cld.Upload.Upload(context.TODO(), fileContent, uploadParams)
	if err != nil {
		log.Println("Error when uploading image to cloudinary")
		log.Fatal(err)
		return nil, err
	}

	return uploadResult, nil
}


func DeleteImageByPublicId(imageId string) bool {
	LoadCloudinary() 
	_, err := Cld.Upload.Destroy(context.TODO(), uploader.DestroyParams{
		PublicID: imageId,
	})
	if err != nil {
		log.Fatal(err)
		return false
	}
	return true
}