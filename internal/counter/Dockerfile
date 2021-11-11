# Set base image
FROM golang:1.11.5 AS builder

# Install xz
RUN apt-get update && apt-get install -y xz-utils mongodb \
    && rm -rf /var/lib/apt/lists/*

# Install UPX
ADD https://github.com/upx/upx/releases/download/v3.94/upx-3.94-amd64_linux.tar.xz /usr/local
RUN xz -d -c /usr/local/upx-3.94-amd64_linux.tar.xz | \
    tar -xOf - upx-3.94-amd64_linux/upx > /bin/upx && \
    chmod a+x /bin/upx

# Project setup
WORKDIR /bin

# Force the go compiler to use modules
ENV GO111MODULE=on

# Grab that code
COPY . .

# Fetch go modules
RUN go mod download

# Build the source
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./main.go

# Strip and compress the binary
RUN strip --strip-unneeded main
RUN upx main

# Use a minimal alpine image
FROM alpine

# Copy the binary from builder
COPY --from=builder /bin/main /main

# Run
ENTRYPOINT ["/main"]
