FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./app /usr/src/app/app
COPY ./cfg /usr/src/app/cfg
COPY ./data /usr/src/app/data
COPY ./misc /usr/src/app/misc
COPY ./scripts /usr/src/app/scripts

COPY ./app.js /usr/src/app/
COPY ./constants.js /usr/src/app/
COPY ./package.json /usr/src/app/

# Use defaults or ENV file
RUN mv cfg/config.template.js cfg/config.js

RUN npm install -g webpack
RUN npm install

# generate documentation
RUN npm install apidoc -g
RUN apidoc -i app/ -o misc/apidoc/

EXPOSE 3000

CMD [ "npm", "start" ]