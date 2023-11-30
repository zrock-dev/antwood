package controllers

func GetTaxAmount(code string, amount float32) float32 {
	switch code {
	case "VAT":
		return amount * 0.1
	case "GST":
		return amount * 0.08
	default:
		return amount * 0.05
	}
}
