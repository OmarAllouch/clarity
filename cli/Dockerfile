# Use a Node.js base image
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build the cli
RUN npm run build

# Run the cli in a separate bash process
CMD ["node", "dist/cli.js"]
