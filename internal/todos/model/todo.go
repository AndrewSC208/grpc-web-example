package model

// Todo is a model for the Todos table
type Todo struct {
	Model

	Name string `json:"name"`
	Done bool   `json:"done"`

	User   User `json:"-"`
	UserID uint `json:"-"`
}
