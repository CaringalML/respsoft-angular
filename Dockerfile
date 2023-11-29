# Stage 1: Build Angular app
FROM node:14 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli@13

# Install project dependencies using npm ci
RUN npm ci

# Copy the application files to the working directory
COPY . .

# Build the Angular app
RUN ng build --configuration production --build-optimizer=true --statsJson=true

# Stage 2: Use a smaller base image for the final container
FROM nginx:1.21.3-alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy only the necessary build artifacts from the build stage
COPY --from=build /usr/src/app/dist/sb-ui-kit-pro-angular .

# Expose port 80
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
