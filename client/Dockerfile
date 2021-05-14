# pull official base image
FROM node:14-alpine as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

COPY . .

ENV SKIP_PREFLIGHT_CHECK=true
ENV REACT_APP_APOLLO_HTTP_URI="http://localhost:4000"
ENV REACT_APP_HOSTNAME="http://localhost:3000"

ARG REACT_APP_SKIP_COGNITO=false

RUN npm run build

FROM node:14-alpine as runtime

RUN npm i -g serve
USER node

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 5000


CMD [ "serve", "--single" ]