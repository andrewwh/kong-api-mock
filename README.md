<h1 style="height: 350px; width: 300px; margin: auto">
  <a style="background: transparent url(https://mylotto.co.nz/images/sprites/GlobalNav-logos-v2@2x.png) -15px -15px no-repeat;height:350px; width: 300px; position: absolute" href="https://mylotto.co.nz"></a>
</h1>

## Kong API with Mocks
This project is a bundle of components running in a docker-compose context to enable a developer and tester to work with both mocks and real services through a single api gateway endpoint.

## Contents

- [Background](#background)
- [Setup](#setup)
    - [Running](#running)
    - [Load Kong configuration](#load-kong-configuration)
- [As Built](AS-BUILT.md)
- [Deploying](DEPLOY.md)
- [License](#license)
- [Copyright](#copyright)

## Background
Front end development is easier if it integrates with mock services that allow a developer, tester or user to explore all possible scenarios that are difficult to replicate in an integrated environment.

The mock api gateway is a real [kong](https://konghq.com/) gateway that connects to the bundled mock service (wiremock) or alternatively a real downstream system.

As the gateway is bundled as a docker instance which is considered ephemeral it comes with a service to recreate all the services and routes from file. Of course, this could be productionised with beter care of the Kong datastore, but the objective is to redeploy the entire stack without this consideration as it makes continuous deployment easier. In addition, having the kong configuration committed to source code feels like a better practice.

A typical developer flow would be:
1. Build all mock responses for services (happy and error path)
2. Integate service into the front end application
3. Develop real service
4. Switch gateway to real service to perform end-to-end integration testing

## Setup
You will require the following installed to get started:
* docker
* docker-compose
* java
* node
* jq (useful)

### Running Compose
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

### Load Kong configuration
The [kong-load](kong-load/index.js) application will load configuration stored in [kong-config](kong-config/README.md). The files are standard kong content types. Each one may be applied manually using curl. See [Config Help](kong-config/README.md) for how to use curl for each content type. Before you start you should also be familiar with the [Kong API documentation](https://docs.konghq.com/1.0.x/admin-api).

The kong-load application is a nodejs (javascript) application. After running npm install in the [kong-load](kong-load) directory, execute the command from the root directory of this project:

```bash
kong-load/index.js --host kong host and port --config directory --environment name
```

| Option        | Description                                             | Default               |
| ------------- |:-------------                                           | :-----                |
| --host        | Http base url of the kong admin API                     | http://localhost:8001 |
| --config      | Kong configuration file directory                       | kong-config           |
| --environment | Environment specific files under each config type       | none                  |

_Note: You need to have kong running locally or on a network reachable host_

#### Environments
In order to support the gateway in multiple environments, each kong content type such as kong-config/services may have the following files:

1. Service files in the root of this directory which are always loaded (such as those that point to a mock server)
2. A sub-directory named per environment with aditional files that are loaded using the --environment parameter. E.g. kong-config/services/test will contain services specific to the test environment.


## Contributing
See how you can contribute as a developer in our [contributing guide](CONTRIBUTING.md)

## License
> The source code contained herein is copyright Lotto New Zealand Limited, all rights reserved.
> Unauthorized copying of this file, via any medium is strictly prohibited.
> Proprietary and confidential.

## Copyright
(c) 2019 Lotto New Zealand Limited