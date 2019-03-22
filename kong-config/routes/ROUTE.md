# Routes
> Route entities define rules to match client requests. Each Route is associated with a Service, and a Service may have multiple Routes associated to it. Every request matching a given Route will be proxied to its associated Service.
>
> The combination of Routes and Services (and the separation of concerns between them) offers a powerful routing mechanism with which it is possible to define fine-grained entry-points in Kong leading to different upstream services of your infrastructure.

Create one or more route definitions where each route is contained within its own file:
* Create a file name _route name_-route.json
* Do not supply a guid id
* Add the service name without an id or leave the id blank as below

```json
    "service": {
        "name": "mock-service",
        "id": ""
    }
```

_Note: This is a non-standard field name_

## Get a list of Routes
```bash
curl --silent http://localhost:8001/routes | jq
```

## Create a Route
```bash
curl --silent --data "@routes/mock-test-route.json" --header "Content-Type: application/json" --request POST http://localhost:8001/routes | jq
```

## Update a Route
```bash
curl --silent --data "@routes/mock-test-route.json" --header "Content-Type: application/json" --request PUT http://localhost:8001/routes/mock-test-route | jq
```

## Delete a Route
```bash
curl --request DELETE http://localhost:8001/route/mock-test-route
```