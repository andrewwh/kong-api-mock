# Run
FROM node:latest

ENV KONG_CONFIG_DIR=./kong-config
ENV KONG_HOST=http://kong:8001

RUN mkdir -p /usr/src/kong

WORKDIR /usr/src/kong

COPY ./kong-load/package.json ./
COPY ./kong-load/package-lock.json ./

RUN npm install --production

COPY ./kong-load/*.js ./
COPY ./kong-config ./kong-config

COPY ./kong-load/docker/run-entrypoint.sh /docker-entrypoint.sh
RUN chmod u+x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["run"]