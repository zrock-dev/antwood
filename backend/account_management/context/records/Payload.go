package records


type Payload struct {
	Id       string 	  `json:"id"`
	Role     string       `json:"role"`
	Provider string       `json:"provider"`
	AuthToken string      `json:"authToken"`
}