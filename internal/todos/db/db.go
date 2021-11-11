package db

import (
	"errors"

	"todos/model"

	"github.com/jinzhu/gorm"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Keys for the viper config object
const (
	DatabaseURIKey     = "DatabaseURI"
	DatabaseDialectKey = "DatabaseDialect"
)

// Errors
var (
	ErrDatabaseURI     = errors.New("DatabaseURI must be set")
	ErrDatabaseDialect = errors.New("DatabaseDialect must be set for the orm")
	ErrTodoNotFound    = errors.New("could not find todo")
	ErrTodosNotFound   = errors.New("could not find todos")
	ErrorCreateTodo    = errors.New("could not create todo")
)

// Config object for the database
type Config struct {
	DatabaseURI     string
	DatabaseDialect string
}

// Configure initializes the database config struct from viper, that reads the config.yaml file
func Configure() (*Config, error) {
	config := &Config{
		DatabaseURI:     viper.GetString(DatabaseURIKey),
		DatabaseDialect: viper.GetString(DatabaseDialectKey),
	}

	// validation methods for the configuration
	if config.DatabaseURI == "" {
		return nil, ErrDatabaseURI
	}
	if config.DatabaseDialect == "" {
		return nil, ErrDatabaseDialect
	}
	return config, nil
}

// Database is wrapping gorm so we can add methods to it
type SqlDatabase struct {
	table  *gorm.DB
	logger *logrus.Entry
}

// New creates a new Database object
func New(config *Config, logger *logrus.Entry) (*SqlDatabase, error) {
	logger.WithField("function", "New database object")

	db, err := gorm.Open(config.DatabaseDialect, config.DatabaseURI)
	if err != nil {
		logger.WithError(err).Errorf("unable to connect to the database")
		return nil, err
	}

	return &SqlDatabase{
		table:  db,
		logger: logger,
	}, nil
}

// Notice how the methods are short concise, and this layer is very dumb. The db methods should not validate at all that
// is a responsibility of the app layer. The db layer is ONLY supposed to interact with the db.

// GetTodoByID finds the first todo with the given id
func (db *SqlDatabase) GetTodoByID(id uint) (*model.Todo, error) {
	var todo model.Todo

	db.table.First(&todo, id)
	if &todo == nil {
		db.logger.WithError(ErrTodoNotFound).Error(id)
		return nil, ErrTodoNotFound
	}

	return &todo, nil
}

// GetTodosByUserID returns a slice of all todos found with a fk of UserID
func (db *SqlDatabase) GetTodosByUserID(userID uint) ([]*model.Todo, error) {
	var todos []*model.Todo

	db.table.Find(&todos, model.Todo{UserID: userID})
	if todos == nil {
		db.logger.WithError(ErrTodosNotFound).Error(userID)
		return nil, ErrTodoNotFound
	}

	return todos, nil
}

// CreateTodo inserts a todo into the db.table
func (db *SqlDatabase) CreateTodo(todo *model.Todo) (string, error) {
	err := db.table.Create(todo).Error
	if err != nil {
		db.logger.WithError(ErrorCreateTodo).Error(todo)
		return "", err
	}

	return string(todo.ID), nil
}

// UpdateTodo updates a todo in the db
func (db *SqlDatabase) UpdateTodo(todo *model.Todo) error {


	return errors.Wrap(db.Save(todo).Error, "unable to update todo")
}

// DeleteTodoByID removes a todo from the db by it's id
func (db *SqlDatabase) DeleteTodoByID(id uint) error {
	return errors.Wrap(db.Delete(&model.Todo{}, id).Error, "unable to delete todo")
}
