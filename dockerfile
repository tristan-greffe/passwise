FROM node:18-bullseye-slim

# Copy the built artefact.
COPY passwise.tgz /opt/.
WORKDIR /opt
RUN tar zxf passwise.tgz && rm passwise.tgz

RUN ls /
RUN ls /opt/passwise
RUN ls /opt
RUN ls /opt/passwise/passwise


RUN chmod +x /opt/passwise/passwise
WORKDIR /opt/passwise/passwise

# Configue the required env
ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Run the app
EXPOSE 8081
CMD [ "yarn", "prod" ]
