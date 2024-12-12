# Base image with specific Node.js version
FROM node:18

# Instala pnpm globalmente
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 80

# Command to run the application in production mode
CMD ["npm", "run", "start"]
