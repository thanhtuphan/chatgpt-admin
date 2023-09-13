FROM node:18.16.0

ENV HOST=0.0.0.0
ENV PORT=3000

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn install

COPY . /app

RUN yarn build

CMD yarn start

EXPOSE 3000
