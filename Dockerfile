FROM node:10.22.1-alpine3.11 as build-deps
WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build


FROM nginx:1.19.3-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

