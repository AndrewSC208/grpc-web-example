package app

import (
	"fmt"
	"log"
	"net"
	"net/http"

	d "counter/dao"
	h "counter/handler"
	s "counter/service"
	m "counter/models"

	pb "github.com/AndrewSC208/k8s-dash/api/gen/go/counter"

	"google.golang.org/grpc"
)

// App represents the micro-service as a whole.
// this layers the application, and allows the
// programmer to create a very clean layered
// service that is also very testable, where
// each layer can operate independantly, and 
// be replicated very easialy.
type App struct {
	// Name of the micro-service
	Name string
	// ServicePort is the port the service will be running on
	ServicePort string
	// Listener is a tcp listener registered on ServicePort
	TCPListener net.Listener
	// HTTPServer is an http server for grpc
	HTTPServer *http.Server
	// GRPCServer is a server for grpc
	GRPCServer *grpc.Server
	// Handler transforms all network requests to objects
	Handler *h.Handler
	// Service layer handels all business logic on requests
	Service *s.Service
	// Dao is the access object persistent data
	Dao *d.Dao
}

// NewApp constructs a new application
func New(name, port string) *App {
	// create the store
	store := make(map[string]*m.Counter)

	// create net listener
	tcpListener := newListener(port)

	// create layerd objects
	dao := d.NewDao(name, store)
	svc := s.NewService(dao)
	hnd := h.NewHandler(svc)

	// create the grpcServer
	grpcServer := grpc.NewServer()

	// register counter service with the grpc server
	pb.RegisterCounterServiceServer(grpcServer, hnd)

	return &App{
		Name:        name,
		ServicePort: port,
		TCPListener: tcpListener,
		HTTPServer:  &http.Server{},
		GRPCServer:  grpcServer,
		Handler:     hnd,
		Service:     svc,
		Dao:         dao,
	}
}

// Run will create a new go routine to serve grpc requests
func (a *App) Run() {
	go func() {
		if err := a.HTTPServer.ListenAndServe(); err != nil {
			// cannot panic, because this probably is an intentional close
			log.Printf("Httpserver: ListenAndServe() error: %s", err)
		}
	}()
	log.Printf("counter service running at 0.0.0.0:%s", a.ServicePort)

	// start gRPC server
	err := a.GRPCServer.Serve(a.TCPListener)
	if err != nil {
		panic("gRpc Server failed to start")
	}
}

func newListener(port string) net.Listener {
	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		panic(err)
	}

	return listener
}
