FROM node:9.11.1-alpine as builder

WORKDIR /app/

COPY package.json package-lock.json ./

RUN apk --no-cache add git \
    && npm install --no-package-lock

COPY src/ ./src/
COPY public/ ./public/
COPY config/ ./config/
COPY tslint.json tsconfig.json ./

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/conf.d /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/

RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid \
    && chown -R nginx:nginx /var/cache/nginx

USER nginx

EXPOSE 8080
