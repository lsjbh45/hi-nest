FROM node:16-alpine3.16 AS development
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --global pm2
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine3.16 AS production
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --global pm2
RUN apk --no-cache add --virtual builds-deps build-base python3
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
