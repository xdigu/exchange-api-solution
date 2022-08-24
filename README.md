# Currency Exchange

This repository is the solution to a [multiple requests challenge](https://dev.to/zanfranceschi/desafio-integracao-com-apis-4jco), in this challenge we have 3 services with different contracts for each integration. Despite the challenge of giving us the implementation of these 3 services, I took the liberty of implementing them again in nodejs, if you want to take a look at this re-implementation, just access the `exchange-api` folder.

In addition to the resolution api found in the `resolution-api` folder, I made a front-end application that connects to the entire result (it can be seen in `resolution-web-client`).

## Running project

The simplest way to run this project is with docker, but we can also run each app individually.

### Docker way

With docker just run:

```sh
$ docker compose up
```

### Individually way

To run individually we will need 3 terminals inside the main folder of the project, first let's start the challenge api:

```sh
$ cd exchange-api
$ yarn
$ yarn dev
```

Now in the second terminal, let's run the resolution app:

```sh
$ cd resolution-api
$ yarn
$ yarn dev
```

And finally the front-end application:

```sh
$ cd resolution-web-client
$ yarn
$ yarn dev
```