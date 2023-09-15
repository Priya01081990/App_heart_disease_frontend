FROM node:14.20-alpine AS build
ARG SKIP_PREFLIGHT_CHECK
ARG REACT_APP_API_BASE_URL
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.2-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /frontend/build/ .
RUN echo "server { listen 80 default_server; root /usr/share/nginx/html; index index.html; location / { try_files \$uri \$uri/ /index.html; }}" > /etc/nginx/conf.d/default.conf
RUN [ -s index.html ]
EXPOSE 80
