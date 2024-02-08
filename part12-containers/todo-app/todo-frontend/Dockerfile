FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm run build

FROM build-stage as test-stage

RUN CI=true npm test

FROM nginx:1.20-alpine as final-stage
COPY --from=test-stage /usr/src/app/build /usr/share/nginx/html
