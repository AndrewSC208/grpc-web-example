package dao

import (
	"log"
	"errors"
	"time"

	m "counter/models"

	"github.com/sirupsen/logrus"
)

// Dao represents the data access object for the counter service
// is the layer that actually touches the database or in this case
// the map that is acting as the db. Generally, the name
// of the Dao will correlate with the table/collection/server name in/of
// the database
// NOTE: This dao is not communicating with a db it's using a local in mem map, this is only a simple example
type dao struct {
	Name  string
	logger *logrus.Entry
	Store map[string]*m.Counter
}

// This is the dao interface that implements all the CRUD operations
type Dao interface {
	Create()
	Read()
	Update()
	Delete()
}

// Set all errors messages up front
var (
	ErrDuplicateId = errors.New("counter with that id already exists")
)

// New is a factory function that creates a new dao for a specific model and database
// the struct also implements a consistent interface so that it can be tested by it's self
func New(name string, store map[string]*m.Counter) *dao {
	return &dao{
		Name:  name,
		Store: store,
	}
}

// Create will add a new counter to the database
func (d *dao) Create(c *m.Counter) (string, error) {
	d.logger.WithField("create", c)

	// check to make sure id is in map
	_, exists := d.Store[c.Id]
	if exists {
		d.logger.WithError(ErrDuplicateId).WithField("create", c)
		return "", ErrDuplicateId
	}

	// store the counter in the map
	// NOTE: This is normally a call to a database, however for this example we are storing everything in mem
	d.Store[c.Id] = c

	return c.Id, nil
}

// Read takes a query map[string]string and returns a list of counters
func (d *dao) Read() ([]*m.Counter, error) {
	d.logger.WithField("read", "params: ").WithTime(time.Now())

	values := []*m.Counter{}

	for _, val := range d.Store {
		values = append(values, val)
	}

	return values, nil
}

// Update updates an counter in the store
func (d *dao) Update(c *m.Counter) (string, error) {
	log.Println("[COUNTER]::[UPDATE]", c)

	// check to make sure id is in map
	_, ok := d.Store[c.Id]
	if !ok {
		err := errors.New("Counter was not found")
		log.Println("[COUNTER]::[UPDATE]", err)
		return "", err
	}

	// update map
	d.Store[c.Id] = c

	return c.Id, nil
}

// Delete updates an counter in the store
func (d *dao) Delete(id string) (string, error) {
	log.Println("[COUNTER]::[DELETE]", id)

	// check to make sure id is in map
	_, ok := d.Store[id]
	if !ok {
		err := errors.New("Counter was not found")
		log.Println("[COUNTER]::[DELETE]", err)
		return "", err
	}

	delete(d.Store, id)

	return id, nil
}
