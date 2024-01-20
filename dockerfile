FROM node:18-bullseye-slim

# Create a directory for the application in the container
WORKDIR /usr/src/app
# Copy application files into the container
COPY . .
RUN yarn
RUN yarn build
WORKDIR /usr/src/app/api 
RUN yarn

ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Run the app
EXPOSE 8081
CMD [ "yarn", "prod" ]
