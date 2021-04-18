FROM node:14-alpine

WORKDIR /

ADD . .

RUN yarn

ENV PORT=8080

RUN yarn build

CMD yarn start
