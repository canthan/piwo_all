FROM node:11.10.0-alpine as builder

WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --production=false

COPY src/ ./src/
COPY tsconfig.json ./

RUN yarn run tsc

FROM node:11.10.0-alpine

WORKDIR /app/

COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn install --pure-lockfile --production \
    && yarn cache clean

COPY --from=builder /app/build ./build

RUN chown -R node:node .

EXPOSE 3019

USER node

CMD ["node", "./build/index.js"]
