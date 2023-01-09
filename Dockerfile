FROM node:17-alpine As development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:17-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install --production --ignore-scripts

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]