# Use a base Node.js image
FROM node:latest

# Use a base Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy compiled JavaScript files from the root directory
COPY dist ./dist

# Expose the port your app runs on
EXPOSE 5001

# Command to run your app
CMD ["node", "./dist/index.js"]




