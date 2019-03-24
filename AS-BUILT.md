# As Built
The API Gateway with build in mocks runs within a docker compose context. Within this context are the following components:

1. Kong API Gateway which is the main entry point
2. The Kong db (postgresql) keeps track of the kong gateway state
3. Wiremock has all the mock requests and responses for all downstream services
4. Migrations initialises the kong database at start up (just runs the kong container with migration arguments)
5. Kong config is a file based storage of the kong configuration which is loaded on start up.

_Illustration: Docker compose context_
<img src="docs/gateway.png"/>

## Contents
- [Technology](#technology)
- [Third party libraries](#third-party-libraries)
- [Compromises](#compromises)
- [Known Technical Debt](#known-technical-debt)

## Technology

### Docker & Docker compose
Nice easy way to bundle muliple services and get it running on localhost.

### Wiremock
Wiremock has a great request matching and a solid admin API to add scenarious dynamically.

## Third party libraries


## Compromises and Decisions
* No SSL for simplicity which does not mock a real API gateway (that of course would use https).
* No auth

## Known technical debt
