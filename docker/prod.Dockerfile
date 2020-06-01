FROM node:12-alpine as builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build


FROM nginx:stable-alpine

RUN mkdir /app
COPY --from=builder /app/dist/ /app
COPY nginx.conf /etc/nginx/nginx.conf
