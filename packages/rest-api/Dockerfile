FROM node:14-alpine

WORKDIR /

ADD . .

RUN yarn

RUN yarn build

CMD yarn prod
