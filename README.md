<h1 style="height: 350px; width: 300px; margin: auto">
  <a style="background: transparent url(https://mylotto.co.nz/images/sprites/GlobalNav-logos-v2@2x.png) -15px -15px no-repeat;height:350px; width: 300px; position: absolute" href="https://mylotto.co.nz"></a>
</h1>

## Kong API with Mocks
This project is a bundle of components running in a docker-compose context to enable a developer and tester to work with both mocks and real services through a single api gateway endpoint.

## Contents

- [Background](#background)
- [Setup](#setup)
    - [Running](#running)
- [As Built](AS-BUILT.md)
- [Deploying](DEPLOY.md)
- [License](#license)
- [Copyright](#copyright)

## Background
Front end development is easier if it integrates with mock services that allow a developer, tester or user to test all possible scenarios that are difficult, or impossible, to replicate in an integrated environment.

The mock api gateway is a real gateway (kong) that connects to the bundled mock service (wiremock) or alternatively a real downstream system.

As the gateway is bundled as a docker instance that is considered ephemeral it comes with a service to recreate all the services and routes.

A typical flow would be:
1. Build mock responses for services
2. Integate service into front end
3. Develop service
4. Switch gateway to real service

## Setup
You will require the following to get started:
* docker
* docker-compose
* java
* node
* jq (useful)

### Running
Run locally with docker compose:
```
docker-compose up --build
```

#### Test
_Through the Gateway_

```
curl --silent --header "host: api.dev.mylotto.co.nz" http://localhost:8000/api/test/hello  | jq
```

_Directly to the Mock Server_
```
curl --silent http://localhost:8888/api/health/status | jq
```

## Contributing
See how you can contribute as a developer in our [contributing guide](CONTRIBUTING.md)

## License
> The source code contained herein is copyright Lotto New Zealand Limited, all rights reserved.
> Unauthorized copying of this file, via any medium is strictly prohibited.
> Proprietary and confidential.

## Copyright
(c) 2019 Lotto New Zealand Limited