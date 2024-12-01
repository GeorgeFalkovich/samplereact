# Use official Node.js image to build the React app
FROM node:16 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the React app
RUN npm run build

# Use official Apache image to serve the build files
FROM httpd:2.4

# Copy the build files from the previous stage to the Apache web server directory
COPY --from=build /app/build /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start the Apache server
CMD ["httpd-foreground"]
