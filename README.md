# BankIO Checkout Integration Patterns Demo WebApp

## Description

The demo web application is a React app that shows different styles of BankIO integrations. It uses the wonderful [Ace Code Editor](https://github.com/ajaxorg/ace) to provide a live demonstration HTML and Javascript code which you can tweak and see rendered on the page.

## Development

The source is found in the `src/app` directory.

Please feel free to follow the [Contribution Guidelines](../master/CONTRIBUTING.md) to contribute to this demo application. PRs are welcome, but for major changes please raise an issue first.

### Run locally in Docker

This command downloads all requirements, builds the source and starts the app inside the container. Nothing other than Docker needs to be installed.

```sh
$ docker-compose up
```

If you make code changes and want to see them reflected, you will need to rebuild the container with and start the updated container with the following commands

```sh
$ docker-compose build
$ docker-compose up
```

### Run locally at command line

```sh
$ yarn install
```

#### Environment variables

Copy [.env.example](.env.example) file as .env and populate the environment variables.

#### Download project requirements

```sh
$ yarn install
```

#### Build the React app

```sh
$ yarn build
```

#### Start the app

```sh
$ yarn start
```
