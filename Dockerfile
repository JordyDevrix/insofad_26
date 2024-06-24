#FROM node:alpine
#
#WORKDIR /usr/src/app
#
#COPY package.json .
#COPY package-lock.json .
#
#RUN npm install
#
#COPY . .
#
#CMD /usr/src/app/node_modules/.bin/ng serve --host 0.0.0.0

FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM node:18-alpine

WORKDIR /app

RUN npm install -g angular-http-server

COPY --from=build /app/dist/bol-com-webshop/browser /app/dist

EXPOSE 4200

CMD ["angular-http-server", "--path", "/app/dist", "-p", "4200"]