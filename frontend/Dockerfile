FROM node:16-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . /frontend

CMD ["npm", "run", "dev"]
