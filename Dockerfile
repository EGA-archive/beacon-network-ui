FROM node:19.0-alpine

# set working directory
WORKDIR /usr/src/app

# add _/usr/src/app/node_modules/.bin_ to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn install --production