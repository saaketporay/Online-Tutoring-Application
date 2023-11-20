FROM node:20.9-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN echo "VITE_BACKEND_BASE_URL= ${VITE_BACKEND_BASE_URL}"
CMD ["npm", "run", "dev"]
