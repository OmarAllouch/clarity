FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Expose Vite's development server port
EXPOSE 5173

# Start the Vite development server
CMD ["yarn", "dev"]
