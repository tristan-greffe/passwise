FROM node:18-bullseye-slim

WORKDIR /usr/src/app
COPY . .

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Run the app
EXPOSE 8081
CMD [ "yarn", "prod" ]
