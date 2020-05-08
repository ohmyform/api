FROM node:12 AS builder
MAINTAINER OhMyForm <admin@ohmyform.com>

WORKDIR /usr/src/app

# just copy everhing
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=3000

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
