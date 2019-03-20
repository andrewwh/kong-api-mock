#!/bin/sh

if [ "$1" = "run" ]; then
  shift
  cd /usr/local/wiremock
  
  mvn exec:java@wiremock
  exit 0
fi

shift
exec "$@"
