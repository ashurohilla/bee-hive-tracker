# Base image for Next.js 15
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Build the Next.js project
RUN npm run build

# Expose port and start app
EXPOSE 3000
CMD ["npm", "start"]
