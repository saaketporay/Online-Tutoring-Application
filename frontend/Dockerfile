FROM node:20.9-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
ENV VITE_BACKEND_BASE_URL=54.163.110.159
RUN env
CMD ["npm", "run", "dev"]
