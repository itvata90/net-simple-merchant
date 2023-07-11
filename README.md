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
stay at `src` directory:
# Migration
$ dotnet ef migrations add/remove/script [scriptname] -p [targetproject] -s [sourceproject] -o Migrations
dotnet ef migrations add InitialCreate -p MerchantAccount.Persistence -s MerchantAccount.Web -o Migrations
# Update database
$ dotnet ef database update
dotnet ef database update -p MerchantAccount.Persistence -s MerchantAccount.Web --context ApplicationDBContext
```

## Insomnia/Postman

-   Insomnia: import Insomnia.json
-   Postman: import Insomnia.har

## License

Nest is [MIT licensed](LICENSE).
