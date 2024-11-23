# Use the official Node.js image as a base for dependency installation
ARG NODE_VERSION=node:22.11-alpine3.20
FROM $NODE_VERSION AS dependency-base

ENV PROJECT_DIR=/app
# Set the working directory
WORKDIR $PROJECT_DIR

# Copy package.json and package-lock.json
COPY ./package*.json ./

FROM dependency-base AS production-base

COPY --chown=node:node . $PROJECT_DIR

# Install dependencies
RUN npm ci --omit=dev

FROM production-base AS production

USER node

COPY --from=production-base $PROJECT_DIR .

# Expose the application port and start the application
EXPOSE 8080

CMD ["npm", "run", "start"]
