package handler

import (
	"log"
	"context"
	"errors"

	s "counter/service"
	m "counter/models"

	pb "github.com/AndrewSC208/k8s-dash/api/gen/go/counter"
)

// Handler transforms and routes network requests
// to actions and objects that can be used in the
// micro-service, this is why each handler method
// has some sort of factory function. One thing
// that I don't like about this pattern is if a 
// protocol buffer changes then the model, and it's
// struct has to change as well.
type Handler struct {
	Service *s.Service
}

// NewHandler creates a new handler layer
func NewHandler(svc *s.Service) *Handler {
	return &Handler{
		Service: svc,
	}
}

// Create is the handler method that responds to the Create rpc method
func (h *Handler) Create(ctx context.Context, req *pb.Counter) (*pb.Id, error) {
	log.Println("[COUNTER]::[CREATE]", req)

	// transform request to an object that is usable in the system
	model, err := m.NewCounter(req)
	if err != nil {
		log.Println("[COUNTER]::[CREATE]", err)
		return nil, err
	}

	// invoke service layer with the counter model
	id, err := h.Service.Create(model)
	if err != nil {
		log.Println("[COUNTER]::[CREATE]", err)
		return nil, err
	}

	// create response
	return &pb.Id{
		Id: id,
	}, nil
}

// Read is the handler method that responds to the Read rpc method.
// As of right now I would like to query all and not assemble a pattern
// for doing complex queries.
func (h *Handler) Read(ctx context.Context, req *pb.Blank) (*pb.Counters, error) {
	log.Println("[COUNTER]::[READ]", req)

	// invoke the service layer
	foundList, err := h.Service.Read()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	// create response
	res := &pb.Counters{}

	// transform models to pbs
	for _, v := range foundList {
		val, err := v.ToPB()
		if err != nil {
			err := errors.New("Failed to transform Counter to a pb")
			return nil, err
		}
		res.Counters = append(res.Counters, val)
	}

	return res, nil
}

// Update handles all update rpc requests
func (h *Handler) Update(ctx context.Context, req *pb.Counter) (*pb.Id, error) {
	log.Println("[COUNTER]::[UPDATE]", req)

	// transform request to a counter object
	counter, err := m.NewCounter(req)
	if err != nil {
		log.Println("[COUNTER]::[UPDATE]", err)
		return nil, err
	}
	
	// invoke the service layer with the counter to be updated
	id, err := h.Service.Update(counter)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	// create response
	return &pb.Id{
		Id: id,
	}, nil
}

// Delete handle all delete rpc requests
func (h *Handler) Delete(ctx context.Context, req *pb.Counter) (*pb.Id, error) {
	log.Println("[COUNTER]::[DELETE]", req)

	// Invoke the service layer with id to delete
	id, err := h.Service.Delete(req.Id)
	if err != nil {
		log.Println("[COUNTER]::[DELETE]", err)
	}

	// create response
	return &pb.Id{
		Id: id,
	}, nil
}
