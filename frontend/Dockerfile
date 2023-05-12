FROM node:16-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm ci


RUN chown -R node:node ./node_modules
RUN chmod -R 775 ./node_modules

USER node

COPY . /frontend

CMD ["npm", "run", "dev"]
