FROM node:latest AS build
WORKDIR /usr/src
COPY . ./
COPY package.json .
RUN npm install
RUN npm run build

FROM node:latest
WORKDIR /app
COPY --from=build /usr/src/build .
EXPOSE 3000
RUN npm install -g serve
RUN apt-get update && apt-get install -y iputils-ping 
RUN ls -la
ENTRYPOINT ["serve"]