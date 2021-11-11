SHELL=/bin/sh
ROOT_DIR=$(shell pwd)
API_DIR=$(ROOT_DIR)/api

#######
# UTILS
#######
.PHONY: submodules tag protos pbs modules clean-protos push
submodules:
	git submodule init
	git submodule update

protos:
	# create protocol buffers
	prototool generate $(API_DIR)

modules:
	# create the api
	cd ./api && go run api.go

push:
	# push generated code
	git add .
	git commit -m "Generate protos $(shell cat ./VERSION)"
	git push origin HEAD

tag:
	# tag and push
	git tag $(shell cat ./VERSION)
	git push origin --tags

clean-protos:
	cd api rm -rf gen

pbs: protos modules push tag

###############
# RELEASE UTILS
###############
# minor release is called when a user story is complete and the system needs to be built
mr:
	# todo -> Add an arg for the commit message
	cd ./tools && go run minorRelease.go

#################
# COUNTER SERVICE
#################
# todo -> add container build
.PHONY: counter
counter:
	cd ./internal/counter &&\
	go build main.go

start-counter: export SERVICE_PORT = 34000
start-counter: export SERVICE_NAME = counter
start-counter:
	cd ./internal/counter &&\
	go run main.go

#######
# ENVOY
#######
.PHONY: proxy proxy-start proxy-stop proxy-clean
proxy:
	cd ./third_party/envoy && docker build -t grpc-proxy .

start-proxy: proxy
	docker run --name grpc-proxy -p 8080:8080 grpc-proxy
	docker ps

stop-proxy:
	docker kill grpc-proxy

clean-proxy:
	docker rm grpc-proxy -f
	docker rmi grpc-proxy -f

#####
# WEB
#####
.PHONY: web, web-run
web:
	cd ./internal/web-client && npm run build

start-web:
	cd ./internal/web-client && npm start
