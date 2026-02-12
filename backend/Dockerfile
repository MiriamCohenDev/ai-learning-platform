# ---------------------------------------------------------
# Dockerfile - Backend (NestJS) - Development Environment
# ---------------------------------------------------------
# This image is optimized for development usage together
# with docker-compose bind mounts.
#
# Expected docker-compose configuration:
#   - ./backend:/app
#   - backend_node_modules:/app/node_modules
#
# Behavior:
#   - Source code is mounted from host
#   - node_modules is stored inside Docker volume
#   - Runs NestJS in watch mode (start:dev)
# ---------------------------------------------------------

FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy only package files first (for dependency installation layer caching)
COPY package*.json ./

# Install dependencies inside container
# node_modules will persist via named volume
RUN npm install

# Install curl for healthcheck
RUN apk add --no-cache curl


# Expose application port
EXPOSE 3000


# Start NestJS in development/watch mode
CMD ["npm", "run", "start:dev"]
