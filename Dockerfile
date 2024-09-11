FROM node:20.11.1-alpine as build
RUN apk add openjdk11
WORKDIR /app
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the React application with Nginx
FROM nginx:alpine

# Copy the build artifacts from the 'build' stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file, if any
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]