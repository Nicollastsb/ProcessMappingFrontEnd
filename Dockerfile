# Use the official Node.js image as the base image
FROM node:16 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Build the React application
# RUN npm run build
CMD ["npm", "run", "dev"]