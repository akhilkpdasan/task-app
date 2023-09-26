FROM node:20

WORKDIR /tasks_app
COPY package.json .
RUN npm install
RUN npm install knex -g
COPY . .
CMD npm start
