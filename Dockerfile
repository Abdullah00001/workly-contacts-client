# Step 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Accept build args from Render
ARG VITE_API_BASE_URL
ARG VITE_OTP_LENGTH
ARG VITE_VU_E_SECRET

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_OTP_LENGTH=$VITE_OTP_LENGTH
ENV VITE_VU_E_SECRET=$VITE_VU_E_SECRET

# Build the app
RUN npm run build

# Step 2: Serve with a static file server
FROM nginx:stable-alpine AS production

# Copy build output to nginx's html directory
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Optional: Replace the default nginx config with your own
# (Uncomment and provide `nginx.conf` if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port (Render expects this to be 80)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
