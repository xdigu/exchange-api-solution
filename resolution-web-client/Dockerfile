FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

COPY node_modules ./node_modules

RUN yarn

COPY ./src ./src

COPY index.html ./

COPY vite.config.ts ./

COPY public ./

EXPOSE 5173

CMD ["yarn", "dev"]
