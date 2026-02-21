FROM node:20-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci
RUN npm install @rollup/rollup-linux-x64-gnu

COPY . /frontend

CMD ["npm", "run", "dev"]
