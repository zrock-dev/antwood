package utils

import (
	"mime/multipart"
	"product_management/app/models"
	"product_management/context/repository"
	"strconv"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ParseValidSneakerColor(form *multipart.Form) (models.SneakerColor, string, []string) {
	newSneakerColor := models.SneakerColor{
		ID:       primitive.NewObjectID(),
		Images:   []models.ImageData{},
		Sizes:    []float32{},
		Quantity: 0,
	}
	brand := form.Value["brand"][0]
	quantity, _ := strconv.Atoi(form.Value["quantity"][0])
	sizes := parseSizes(form.Value["sizes[]"])
	uploadedImages := parseImages(form.File["images[]"], brand)
	deletedImages := form.Value["deleted_images[]"]
	newSneakerColor.Quantity = quantity
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

func parseSizes(sizeStrings []string) []float32 {
	var sizes []float32
	for _, sizeStr := range sizeStrings {
		size, err := strconv.ParseFloat(sizeStr, 32)
		if err != nil {
			return []float32{}
		}
		sizes = append(sizes, float32(size))
	}
	return sizes
}
