#!/bin/bash

echo "Checking Kong gateway is available at ${KONG_HOST}"
until curl --silent ${KONG_HOST}/services >/dev/null 2>&1 ; do
  >&2 echo "Kong Gateway ${KONG_HOST} is unavailable. Sleeping for one second"
  sleep 1
done

if [ "$1" = "run" ]; then
    echo "Executing : node index.js --config $KONG_CONFIG_DIR --host $KONG_HOST $([[ ! -z "$GW_ENVIRONMENT" ]] && echo --environment $GW_ENVIRONMENT)"
    node index.js --config $KONG_CONFIG_DIR --host $KONG_HOST $([[ ! -z "$GW_ENVIRONMENT" ]] && echo --environment $GW_ENVIRONMENT)
    exit
fi

shift
exec "$@"