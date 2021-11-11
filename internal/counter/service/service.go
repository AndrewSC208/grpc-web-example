package service

import (
	"log"

	d "counter/dao"
	m "counter/models"
)

// Service is a layer thta handles all the business logic of a micro service
type Service struct {
	Dao *d.Dao
}

// TODO -> Add an interface for better unit testing

// NewService creates a service layer
func NewService(dao *d.Dao) *Service {
	return &Service{
		Dao: dao,
	}
}

// Create is responsible for all business logic around creating
// a counter
func (s *Service) Create(c *m.Counter) (string, error) {
	log.Println("[COUNTER]::[CREATE]", c)

	// invoke the dao with the counter
	id, err := s.Dao.Create(c)
	if err != nil {
		log.Println("[COUNTER]::[CREATE]", err)
		return "", err
	}

	return id, nil
}

// Read passes down the Query object to the dao layer to query the db
func (s *Service) Read() ([]*m.Counter, error) {
	log.Println("[COUNTER]::[READ]")

	found, err := s.Dao.Read()
	if err != nil {
		log.Println("[COUNTER]::[READ]", err)
		return nil, err
	}

	return found, nil
}

// Update is my experimental method where I am passing
// down the whole protobuf method, and creating the pb
// method response down ad the dao level
func (s *Service) Update(c *m.Counter) (string, error) {
	log.Println("[COUNTER]::[UPDATE]", c)

	updated, err := s.Dao.Update(c)
	if err != nil {
		log.Println("[COUNTER]::[UPDATE]", err)
		return "", err
	}

	return updated, nil
}

// Delete passes the id to delete
func (s *Service) Delete(id string) (string, error) {
	log.Println("[COUNTER]::[DELETE]", id)

	removedID, err := s.Dao.Delete(id)
	if err != nil {
		log.Println("[COUNTER]::[DELETE]", err)
		return "", err
	}

	return removedID, nil
}
