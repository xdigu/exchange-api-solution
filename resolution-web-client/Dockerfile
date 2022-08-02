FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

COPY node_modules ./node_modules

RUN yarn

COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]
