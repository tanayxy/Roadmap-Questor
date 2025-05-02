# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set Vite port explicitly
ENV VITE_PORT=5173

# Expose the port Vite runs on
EXPOSE 5173

# Start the development server with host flag and port
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]