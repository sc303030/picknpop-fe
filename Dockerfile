FROM node:20-alpine
ENV NODE_ENV=test
WORKDIR /app
COPY package*.json ./
RUN yarn install --verbose
COPY . .
RUN yarn build
