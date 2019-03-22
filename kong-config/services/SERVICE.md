# Services
> Service entities, as the name implies, are abstractions of each of your own upstream services. Examples of Services would be a data transformation microservice, a billing API, etc.
>
> The main attribute of a Service is its URL (where Kong should proxy traffic to), which can be set as a single string or by specifying its protocol, host, port and path individually.
>
> Services are associated to Routes (a Service can have many Routes associated with it). Routes are entry-points in Kong and define rules to match client requests. Once a Route is matched, Kong proxies the request to its associated Service. See the Proxy Reference for a detailed explanation of how Kong proxies traffic.

Create one or more service definitions where each service is contained within its own file:
* Create a file name _service name_-service.json
* Do not supply a guid id

## Get a list of Services
```bash
curl --silent http://localhost:8001/services | jq
```

## Create a Service
```bash
curl --silent --data "@services/mock-service.json" --header "Content-Type: application/json" --request POST http://localhost:8001/services | jq
```

## Delete a Service
```bash
curl --request DELETE http://localhost:8001/services/mock-service
```