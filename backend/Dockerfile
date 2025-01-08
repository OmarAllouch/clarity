FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy root-level package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the backend source code
COPY ./backend ./backend
COPY ./prisma ./prisma

# Generate Prisma client
RUN yarn prisma generate

# Expose backend port
EXPOSE 4000

# Start the backend server
CMD ["sh", "-c", "yarn prisma migrate dev && yarn dev:backend"]
