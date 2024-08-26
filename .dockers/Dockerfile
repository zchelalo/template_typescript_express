FROM node:20-alpine3.18

WORKDIR /app

ENV NODE_ENV=development

COPY ../package*.json .
RUN npm install

COPY ../tsconfig*.json .
COPY ../nodemon.json .
COPY ../.env .
COPY ../.env.test .
COPY ../certs certs
COPY ../src src

CMD ["npm", "run", "dev"]