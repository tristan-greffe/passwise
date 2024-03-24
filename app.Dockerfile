##
## Use a builder
##

FROM node:18-bullseye-slim as Builder
LABEL maintainer="boilerplate.js@gmail.com"

# Configure env
ARG APP
ARG FLAVOR

ENV NODE_APP_INSTANCE=$FLAVOR

COPY . /opt/passwise

# Setup app
WORKDIR /opt/passwise/
RUN yarn && cd api && yarn && cd .. && yarn build


##
## Copy to final container
##

FROM node:18-bullseye-slim
LABEL maintainer="boilerplate.js@gmail.com"

# Configure env
ARG APP
ARG FLAVOR

ENV NODE_APP_INSTANCE=$FLAVOR

COPY --from=Builder --chown=node:node /opt/passwise /opt/passwise
# Switch to the node user.
USER node

# Run the app
WORKDIR /opt/passwise
EXPOSE 8081
CMD [ "yarn", "prod" ]
