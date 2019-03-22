# Tagets

> A target is an ip address/hostname with a port that identifies an instance of a backend service. Every upstream can have many targets, and the targets can be dynamically added. Changes are effectuated on the fly.
>
> Because the upstream maintains a history of target changes, the targets cannot be deleted or modified. To disable a target, post a new one with weight=0; alternatively, use the DELETE convenience method to accomplish the same.

Create one or more target definitions where each target is contained within its own file:
* Create a file name _target name_-target.json
* Do not supply a guid id

## Get a list of Targets per Upstream
```bash
curl --silent http://localhost:8001/upstreams/mock-api/targets | jq
```

## Create a Target
```bash
curl --silent --data "@targets/mock-target.json" --header "Content-Type: application/json" --request POST http://localhost:8001/upstreams/mock-api/targets | jq
```

## Delete a Target
```bash
curl --request DELETE http://localhost:8001/upstreams/mock-api/targets/{target id} | jq
```