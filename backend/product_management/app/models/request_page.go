package models

type PaginationResult struct {
	PageIndex int64     `json:"page-index"`
	PageSize  int64     `json:"page-size"`
	Sneakers  []Sneaker `json:"sneakers"`
}
