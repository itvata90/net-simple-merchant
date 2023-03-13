## Description

Simple merchant appliction for by .net core, with clean architecture.

## Tech

-   dotnet 6
-   clean achitecture
-   MediatR (command/handle)
-   FluentValidation (validator), Automapper
-   EF
-   Reactjs
-   Unit tests: Moq, Xunit, FluentAssertions

## Installation

```bash
$ dotnet restore
```

## Running the app

```bash
# run
$ dotnet run

# watch
$ dotnet watch

# build
$ dotnet build
```

## Test

```bash
# unit tests
$ dotnet test

# e2e tests
$ npm/pnpm run test:e2e

# test coverage
$ npm/pnpm run test:cov
```

## DB

```bash
# Migration
$ dotnet ef migrations add/remove/script
# Update database
$ dotnet ef database update
```

## Insomnia/Postman

-   Insomnia: import Insomnia.json
-   Postman: import Insomnia.har

## License

Nest is [MIT licensed](LICENSE).
