FROM node:20-alpine
# Any following commands with a destination path will be relative to /app
WORKDIR /app
# We install dependencies first to make use of layered caching
COPY package.json .
COPY package-lock.json .
RUN npm ci
# Now if any changes are made only to the source code, the above lines will be pulled from the cache to save time
COPY . .
CMD ["npm", "start"]
