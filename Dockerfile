FROM node:10.16.3-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./

RUN if [[ "$ENV" == "production" ]] ; then yarn build:prod ; else yarn build:dev ; fi

FROM nginx:1.20.1-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
