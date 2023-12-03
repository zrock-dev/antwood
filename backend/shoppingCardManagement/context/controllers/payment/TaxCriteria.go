package controllers

func GetTaxAmount(code string, amount float64) float64 {
	switch code {
	case "VAT":
		return amount * 0.1
	case "GST":
		return amount * 0.08
	default:
		return amount * 0.05
	}
}
