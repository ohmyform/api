FROM node:12-alpine AS builder
MAINTAINER OhMyForm <admin@ohmyform.com>

WORKDIR /usr/src/app

# just copy everhing
COPY . .

RUN touch /usr/src/app/src/schema.gql && chown 9999:9999 /usr/src/app/src/schema.gql

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:12-alpine
MAINTAINER OhMyForm <admin@ohmyform.com>

# Create a group and a user with name "ohmyform".
RUN addgroup --gid 9999 ohmyform && adduser -D --uid 9999 -G ohmyform ohmyform

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

ENV PORT=3000 \
    SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root

EXPOSE 3000

# Change to non-root privilege
USER ohmyform

CMD [ "yarn", "start:prod" ]
