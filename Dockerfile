# ------------ STAGE 1: Build the app with Vite ------------
    FROM node:22.14.0-slim AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    
    
    # ------------ STAGE 2: Serve with Nginx ------------
    FROM nginx:stable-alpine
    
    # Clean default nginx html content
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copy built app from previous stage
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Copy custom nginx config
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    