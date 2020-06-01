FROM node:12 AS builder
MAINTAINER OhMyForm <admin@ohmyform.com>

WORKDIR /usr/src/app

# just copy everhing
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:12

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=3000 \
    SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
