# Kong Config
Store kong configuration content files in this directory.

Known configuration content types are:
* Services
* Routes
* Upstreams
* Targets

## Load Configuration
These configuration files can be loaded manually using curl with some modification or with the [kong-load](kong-load) application. See [How to load configuration](../README.md#load-kong-configuration)

## Get Test Hello Message
Once the gateway and mock server are running you can retrieve a health status check either directly from the kong gateway or the mock service if running locally.

### Gateway
```
curl --silent --header "host: api.dev.mylotto.co.nz" http://localhost:8000/api/health/status  | jq
```

### Mock Server
```
curl --silent http://localhost:8888/api/health/status | jq
```