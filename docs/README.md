## How to install

### Docker compose manager module for node.js

```
npm i docker-composer-manager --save
```

## Docker compose manager API

1. [dockerComposeUp](#dockercomposeup)
2. [dockerComposeDown](#dockercomposedown)
3. [dockerComposeStop](#dockercomposestop)
4. [dockerComposeStart](#dockercomposestart)
5. [dockerExec](#dockerexec)
6. [dockerInspectIPAddressOfContainer](#dockerinspectipaddressofcontainer)
7. [dockerInspectPortOfContainer](#dockerinspectportofcontainer)

### DockerComposeUp 

This method receives a URI of a file and builds, (re)creates, starts, and attaches to containers for a service.

#### Parameters

  Name | Type | Description 
  -----|------|-------------
  **file** | `string` | **Required.** The file where the service is described. 
  **args** | `[string]` | **Optional.** Docker compose up commad [options](https://docs.docker.com/compose/reference/up/).
  **processOpt** | `[string]` | **Optional.** NodeJS child_process.spawn [options](https://nodejs.org/docs/latest-v6.x/api/child_process.html#child_process_child_process_spawn_command_args_options).

#### Example

```javascript
var dcManager = require('docker-composer-manager');
var file = __dirname + '/docker-compose.yaml';

dcManager.dockerComposeUp(file).then(out => {
    console.log(out);
}, err=>{
    console.error(err);
});
```

### DockerComposeDown 

This method receives a URI of a file and stops containers, removes containers, networks, volumes, and images created by [dockerComposeUp](#dockercomposeup).

#### Parameters

  Name | Type | Description 
  -----|------|-------------
  **file** | `string` | **Required.** The file where the service is described. 
  **args** | `[string]` | **Optional.** Docker compose down commad [options](https://docs.docker.com/compose/reference/down/).
  **processOpt** | `[string]` | **Optional.** NodeJS child_process.spawn [options](https://nodejs.org/docs/latest-v6.x/api/child_process.html#child_process_child_process_spawn_command_args_options).

#### Example

```javascript
var dcManager = require('docker-composer-manager');
var file = __dirname + '/docker-compose.yaml';

dcManager.dockerComposeDown(file).then(out => {
    console.log(out);
}, err=>{
    console.error(err);
});
```

### DockerComposeStop

This method receives a URI of a file and stops running containers without removing them.

#### Parameters

  Name | Type | Description 
  -----|------|-------------
  **file** | `string` | **Required.** The file where the service is described. 
  **args** | `[string]` | **Optional.** Docker compose stop commad [options](https://docs.docker.com/compose/reference/stop/).
  **processOpt** | `[string]` | **Optional.** NodeJS child_process.spawn [options](https://nodejs.org/docs/latest-v6.x/api/child_process.html#child_process_child_process_spawn_command_args_options).

#### Example

```javascript
var dcManager = require('docker-composer-manager');
var file = __dirname + '/docker-compose.yaml';

dcManager.dockerComposeStop(file).then(out => {
    console.log(out);
}, err=>{
    console.error(err);
});
```

### DockerComposeStart

This method receives a URI of a file and sStarts existing containers for a service.

#### Parameters

  Name | Type | Description 
  -----|------|-------------
  **file** | `string` | **Required.** The file where the service is described. 
  **args** | `[string]` | **Optional.** Docker compose start commad [options](https://docs.docker.com/compose/reference/start/).
  **processOpt** | `[string]` | **Optional.** NodeJS child_process.spawn [options](https://nodejs.org/docs/latest-v6.x/api/child_process.html#child_process_child_process_spawn_command_args_options).

#### Example

```javascript
var dcManager = require('docker-composer-manager');
var file = __dirname + '/docker-compose.yaml';

dcManager.dockerComposeStart(file).then(out => {
    console.log(out);
}, err=>{
    console.error(err);
});
```

### DockerExec

This method receives a container name and the command will be executed inside of it, and execute `docker exec` command with insede_command given.  

#### Parameters

  Name | Type | Description 
  -----|------|-------------
  **container** | `string` | **Required.** The container where the command will be executed.
  **exec_command** | `[string]` | **Required.** The command which will be executed.
  **args** | `[string]` | **Optional.** Docker exec commad [options](https://docs.docker.com/engine/reference/commandline/exec/).
  **processOpt** | `[string]` | **Optional.** NodeJS child_process.spawn [options](https://nodejs.org/docs/latest-v6.x/api/child_process.html#child_process_child_process_spawn_command_args_options).

#### Example

```javascript
var dcManager = require('docker-composer-manager'),
    container = 'node_container_01',
    command = ['node', '--version'];

dcManager.dockerExec(container, command).then(out => {
    console.log(out);
}, err=>{
    console.error(err);
});
```

### DockerInspectIPAddressOfContainer

This method receives a container and retrun a promise that resolves the ip of it.

#### Parameters

  Name | Type | Description 
  -----|------|-------------
  **container** | `string` | **Required.** The container for quering.
  **args** | `object` | **Optional.** This object has only one field: `options.network`. This is the network where the container is attached.
  **processOpt** | `[string]` | **Optional.** NodeJS child_process.spawn [options](https://nodejs.org/docs/latest-v6.x/api/child_process.html#child_process_child_process_spawn_command_args_options).

#### Example

```javascript
var dcManager = require('docker-composer-manager'),
    container = 'node_container_01';

dcManager.dockerInspectIPAddressOfContainer(container,{network: "bridge"}).then(ip => {
    console.log(ip);
}, err=>{
    console.error(err);
});
```

### DockerInspectPortOfContainer

This method receives a container and retrun a promise that resolves the port on it will expose.

#### Parameters

  Name | Type | Description 
  -----|------|-------------
  **container** | `string` | **Required.** The container for quering.
  **processOpt** | `[string]` | **Optional.** NodeJS child_process.spawn [options](https://nodejs.org/docs/latest-v6.x/api/child_process.html#child_process_child_process_spawn_command_args_options).

#### Example

```javascript
var dcManager = require('docker-composer-manager'),
    container = 'node_container_01';

dcManager.dockerInspectPortOfContainer(container).then(port => {
    console.log(port);
}, err=>{
    console.error(err);
});
```
