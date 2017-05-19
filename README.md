# DOCKER COMPOSE MANAGER NPM
>This is BETA module and may have bugs and don't work correctly. It is intended for qualified beta testers only and must not be used in production systems.

## Installation

On your application package run next command:

```
$ node npm install docker-compose-manager
```

### You can use

1. ```dockerComposeUp = function(dir, options, success, error)```
2. ```dockerComposeDown = function(dir, success, error)```
3. ```dockerComposeStop = function(dir, success, error)```
4. ```dockerComposeStart = function(dir, success, error)```
5. ```dockerExec = function (container, exec_command, options, success, error)```
6. ```dockerInspectIPAddressOfContainer = function (container, options)```
7. ```dockerInspectPortOfContainer = function (container, options)```

>Soon more documentation.
