# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
# copy csproj and restore as distinct layers
COPY src/*/*.csproj .
RUN for file in $(ls *.csproj); do mkdir -p ${file%.*}/ && mv $file ${file%.*}/; done

WORKDIR /
COPY *.sln .
RUN dotnet restore --use-current-runtime  

# copy everything else and build app
COPY src/. ./src
RUN dotnet publish --use-current-runtime --self-contained false --no-restore -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app .

ENTRYPOINT ["dotnet", "MerchantAccount.Web.dll"]
