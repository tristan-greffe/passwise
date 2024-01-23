FROM node:18-bullseye-slim

# Configure the required env
ARG APP
ARG FLAVOR
ARG BUILD_NUMBER

ENV BUILD_NUMBER=$BUILD_NUMBER
ENV NODE_APP_INSTANCE=$FLAVOR

# Copy the built artefact.
COPY passwise.tgz /opt/.

# Create the destination directory with proper permissions.
WORKDIR /opt
RUN mkdir -p passwise && chown -R node:node passwise

# Extract the contents of the tgz into the passwise directory.
RUN tar zxf passwise.tgz --strip-components=1 -C passwise && rm passwise.tgz
RUN ls  /opt/passwise

# Switch to the node user.
USER node

# Run the app
WORKDIR /opt/passwise

EXPOSE 8081
CMD [ "yarn", "prod" ]
