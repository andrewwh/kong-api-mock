FROM openjdk:8

EXPOSE 8888

ENV WIREMOCK_DIR=/usr/local/wiremock

WORKDIR $WIREMOCK_DIR
RUN mkdir -p $WIREMOCK_DIR

RUN apt-get update && apt-get -y install maven

COPY pom.xml .

# Running the maven exec command forces download of plugins at the build stage (rather than run)
RUN mvn clean package dependency:go-offline dependency:resolve-plugins --fail-never --batch-mode -DfailIfNoTests=false -Djava.net.useSystemProxies=true && \
    mvn exec:java@help -Djava.net.useSystemProxies=true > /dev/null

COPY __files/ ./__files/
COPY mappings/ ./mappings/

COPY docker/docker-entrypoint.sh /
RUN  chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["run"]
