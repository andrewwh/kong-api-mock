# As Built
The API Gateway with build in mocks runs within a docker compose context locally, but may be deployed to any containerised environment such as Kubernetes.

## Contents
- [Overview](#overview)
- [In Detail](#in-detail)
- [Technology](#technology)
- [Third party libraries](#third-party-libraries)
- [Compromises](#compromises)
- [Known Technical Debt](#known-technical-debt)

## Overview

#### Illustration: Docker compose context
<img src="docs/gateway.png"/>

Within this context are the following components:

1. A Kong API Gateway which is the main entry point
2. The Kong database (postgresql) keeps track of the kong gateway state such as services and routes
3. Wiremock has all the mock requests and responses for all downstream services
4. Migrations initialises the kong database at start up
5. Kong config is a file based storage of the kong configuration which is loaded on start up.

## In Detail
The ability to route to a real service or a mock based on a path regex expression means we can initially route all our traffic to the mock service. Once a service is built we can add a service and create a new route with a higher _regex priority_ than the mock. At any point we can switch back to the mock by deleting the route to the service.

## Technology
The following is a summary of our technology decisions taken when building this project.

### Docker & Docker compose
With docker we have an easy way to bundle muliple services and get it running on localhost. We should also be able to build and push the containers to a repository so they may be deployed into a container orchestrator such as Kubernetes.

### Kong API Gateway
We use the [Kong API Gateway](https://konghq.com/kong/) open source offical docker image. The kong API gateway allows us to have simulataneously routes to our mock service and real downstream services. Without building this ourselves no other product offers a succinct and focused set of features that meet this need.

### Wiremock
Wiremock has a great request matching and a solid admin API to add scenarious dynamically.

### NodeJs for Kong configuration
The kong configuration is stored and versioned in source code. To load this we need to use the Kong admin API. We chose nodejs as the application language as it is the most familiar to our developers. As this runs in a container with all the pre-requisites already meet, running locally was a secondary consideration.

Other possible choices would have been Python or Go.

## Compromises and Decisions
* No SSL for simplicity which does not mock a real API gateway (that of course would use https).
* No auth

## Known technical debt
* Kong load is built without much consideration for future expansion or best engineering practice. It just gets the job done.