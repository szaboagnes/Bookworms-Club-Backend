FROM node:lts-alpine

WORKDIR /usr/bookworms-club-backend

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

COPY app.js .
COPY src ./src

ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["node", "app.js"]
