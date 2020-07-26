FROM golang:1.14-alpine as builder
WORKDIR /build
COPY ./go.mod ./
COPY ./go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o main .
FROM scratch
ENV GIN_MODE release
EXPOSE 8080
COPY --from=builder /build/main /
CMD ["/main"]
