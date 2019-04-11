FROM node:11.10.0-alpine as builder

WORKDIR /app/

COPY package.json yarn.lock ./

RUN apk --no-cache add git \
    && yarn install --pure-lockfile --production=false

COPY src/ ./src/
COPY public/ ./public/
COPY config/ ./config/
COPY tslint.json tsconfig.json ./

RUN yarn run build

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/conf.d /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/

RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid \
    && chown -R nginx:nginx /var/cache/nginx

USER nginx

EXPOSE 8080
