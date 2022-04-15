FROM node:17-alpine3.13

WORKDIR /api

COPY package.json /api/
COPY yarn.lock /api/

RUN yarn install

COPY . .

EXPOSE 5000
CMD ["yarn", "serve"]