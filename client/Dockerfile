FROM node:14.5-alpine as builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prod
FROM nginx:stable-alpine
COPY --from=builder ./build/dist /usr/share/nginx/html
