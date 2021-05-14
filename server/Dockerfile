FROM node:14-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci 

# Bundle app source
COPY . .

CMD [ "npm", "run", "build" ]

FROM node:14-alpine as runner

COPY --from=builder /app /app
WORKDIR /app

USER node

EXPOSE 4000

CMD ["npm", "start"]