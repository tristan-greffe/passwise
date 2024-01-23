FROM node:18-bullseye-slim

# Copy the built artefact.
COPY passwise.tgz /opt/.

# Configure the required env
ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Create the destination directory.
WORKDIR /opt
RUN mkdir -p passwise

# Extract the contents of the tgz into the passwise directory.
RUN tar zxf passwise.tgz --strip-components=1 -C passwise && rm passwise.tgz


RUN ls -al /opt/passwise

# Run the app
WORKDIR /opt/passwise
RUN ls -al /opt/passwise

EXPOSE 8081
CMD [ "yarn", "prod" ]
