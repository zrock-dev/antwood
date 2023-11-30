package requests

import (
	"mime/multipart"
	"product_management/app/models"
	"product_management/app/repository"
	"strconv"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ParseValidSneakerColor(form *multipart.Form) (models.SneakerColor, string, []string) {
	newSneakerColor := models.SneakerColor{
		ID:       primitive.NewObjectID(),
		Images:   []models.ImageData{},
		Sizes:    []models.SizeData{},
	}

	brand := form.Value["brand"][0]
	sizes := parseSizes(form.Value["sizes[]"],form.Value["values[]"])

	uploadedImages := parseImages(form.File["images[]"], brand)
	deletedImages := form.Value["deleted_images[]"]
	newSneakerColor.Sizes = sizes
	newSneakerColor.Images = uploadedImages

	return newSneakerColor, brand, deletedImages
}

func parseImages(files []*multipart.FileHeader, brand string) []models.ImageData {
	var images []models.ImageData
	for _, file := range files {
		result, _ := repository.UploadImage(file, brand)
		if result == nil {
			return []models.ImageData{}
		}
		
		images = append(images, models.ImageData{
			URL: result.SecureURL,
			ID:  result.PublicID,
		})
	}
	return images
}

func parseSizes(sizeStrings []string,valuesString []string) []models.SizeData {
	var sizes []models.SizeData
	for index, sizeStr := range sizeStrings {
		size, err := strconv.ParseFloat(sizeStr, 32)
		if err != nil {
			return []models.SizeData{}
		}

		quantity, err := strconv.Atoi(valuesString[index])
		if err != nil {
			return []models.SizeData{}
		}
		sizeData := models.SizeData{
			Value:    float32(size),
			Quantity: quantity,
		}
		sizes = append(sizes, sizeData)
	}
	return sizes
}
