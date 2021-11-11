package models

import (
	"errors"
	
	pb "github.com/AndrewSC208/k8s-dash/api/gen/go/counter"
)

type Counter struct {
	Id    string
	Name  string
	Count int64
}

// NewCounter is responsiable for transforming a pb to a model
func NewCounter(p *pb.Counter) (*Counter, error) {
	if p.Id == "" {
		err := errors.New("Counter must contain an id")
		return nil, err
	}

	return &Counter{
		Id:      p.Id,
		Name:    p.Name,
		Count:   p.Count,
	}, nil
}

// ToPB transforms a model into a PB for communication on the network
func (c *Counter) ToPB() (*pb.Counter, error) {
	return &pb.Counter{
		Id: c.Id,
		Name: c.Name,
		Count: c.Count,
	}, nil
}
