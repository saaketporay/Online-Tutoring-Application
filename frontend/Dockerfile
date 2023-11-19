FROM node:20.9-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN echo "BACKEND_BASE_URL: $BACKEND_BASE_URL"
CMD ["npm", "run", "dev"]
