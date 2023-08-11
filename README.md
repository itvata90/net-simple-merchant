## Description

Simple merchant appliction for by .net core, with clean architecture.

## Tech

-   dotnet 6
-   [clean achitecture](https://medium.com/dotnet-hub/clean-architecture-with-dotnet-and-dotnet-core-aspnetcore-overview-introduction-getting-started-ec922e53bb97)
-   CQRS, MediatR
-   FluentValidation (validator), Automapper
-   EF
-   Reactjs (custom UI controls)
-   Unit tests: Moq, Xunit, FluentAssertions
-   Docker, GitHub Actions

## Installation

```bash
$ dotnet restore
$ ClientApp/ npm install
```

## Running the app

```bash
# run
$ dotnet run             # start .net core app, will proxy to SPA app running at port 4200.
$ ClientApp/ npm run dev # should start React web app at port 4200

# watch
$ dotnet watch

# build
$ dotnet build
```

## Test

```bash
# unit tests
$ dotnet test

# react test
$ ClientApp/ npm run test
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

## License

Nest is [MIT licensed](LICENSE).
