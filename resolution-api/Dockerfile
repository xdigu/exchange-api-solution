FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

COPY node_modules ./node_modules

RUN yarn

COPY ./src ./src

EXPOSE 8081

CMD ["yarn", "dev"]