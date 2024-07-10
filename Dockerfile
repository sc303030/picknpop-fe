FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --verbose
COPY . .
RUN yarn build
