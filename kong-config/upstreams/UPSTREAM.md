# Upstream
> The upstream object represents a virtual hostname and can be used to loadbalance incoming requests over multiple services (targets).
> So for example an upstream named service.v1.xyz for a Service object whose host is service.v1.xyz. Requests for this Service would be proxied to the targets defined within the upstream.

Create one or more upstream virtual host where each upstream is contained within its own file:
* Create a file name _upstream name_-upstream.json
* Do not supply a guid id

## Get a list of Upstreams
```bash
curl --silent http://localhost:8001/upstreams | jq
```

## Create a Upstreams
```bash
curl --silent --data "@upstreams/mock-upstream.json" --header "Content-Type: application/json" --request POST http://localhost:8001/upstreams | jq
```

## Delete a Upstreams
```bash
curl --request DELETE http://localhost:8001/upstreams/mock-api
```