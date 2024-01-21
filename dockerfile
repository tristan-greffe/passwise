FROM node:18-bullseye-slim

# Create a directory for the application in the container
WORKDIR /passwise
# Copy application files into the container
COPY . .

# Install dependencies
RUN yarn
RUN yarn build
WORKDIR /passwise/api 
RUN yarn

# Configue the required env
ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Run the app
EXPOSE 8081
CMD [ "yarn", "prod" ]
