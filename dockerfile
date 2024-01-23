FROM node:18-bullseye-slim

# Copy the built artefact.
COPY passwise.tgz /opt/.
WORKDIR /opt
RUN mkdir -p passwise
RUN tar tzvf passwise.tgz
RUN tar zxf passwise.tgz -C passwise && rm passwise.tgz

# Configue the required env
ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Run the app
WORKDIR /opt/passwise
RUN ls /opt/passwise
EXPOSE 8081
CMD [ "yarn", "prod" ]
