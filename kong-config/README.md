# Kong

## Load Configuration

## Get Test Hello Message

### Gateway
```
curl --silent --header "host: api.dev.mylotto.co.nz" http://localhost:8000/api/health/status  | jq
```

### Mock Server
```
curl --silent http://localhost:8888/api/health/status | jq
```