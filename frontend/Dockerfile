FROM node:20-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . /frontend

CMD ["npm", "run", "dev"]
