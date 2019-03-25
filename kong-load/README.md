# Kong Load
The kong-load is a node based application that will load configuration stored in [kong-config](../kong-config) directory. The files are standard kong content types. Each one may be applied manually using curl or postman. See [Config Help](../kong-config/README.md) for how to use curl for each content type. Before you start you should also be familiar with the [Kong API documentation](https://docs.konghq.com/1.0.x/admin-api).

## Running
After running npm install, execute the command from the root directory of this project:

```bash
node kong-load/index.js --host kong host and port --config directory --environment name
```
or
```bash
chmod u+x kong-load/index.js
kong-load/index.js --host kong host and port --config directory --environment name
```

| Option        | Description                                             | Default               |
| ------------- |:-------------                                           | :-----                |
| --host        | Http base url of the kong admin API                     | http://localhost:8001 |
| --config      | Kong configuration file directory                       | kong-config           |
| --environment | Environment specific files under each config type       | none                  |

_Note: You need to have kong running locally or on a network reachable host_

### Environments
In order to support the gateway in multiple environments, each kong content type such as _kong-config/services_ may have the following files:

1. Files in the root of this directory are always loaded (such as those that point to a mock server)
2. A sub-directory named per environment with aditional files that are loaded using the --environment parameter. E.g. kong-config/services/test will contain services specific to the test environment.
