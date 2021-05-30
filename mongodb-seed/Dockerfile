FROM node:lts-alpine

WORKDIR /usr/bookworms-club-backend/mongodb-seed

COPY package*.json ./
RUN npm install

COPY index.js ./
COPY data ./data
COPY helpers ./helpers

ENTRYPOINT ["node", "index.js"]
