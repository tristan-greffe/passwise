FROM node:18-bullseye-slim

# Copy the built artefact.
COPY passwise.tgz /opt/.
WORKDIR /opt
RUN tar tf /opt/passwise.tgz
RUN tar zxf passwise.tgz && rm passwise.tgz
WORKDIR /opt/passwise
RUN ls -la /opt/passwise
# Configue the required env
ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Run the app
EXPOSE 8081
CMD [ "yarn", "prod" ]
