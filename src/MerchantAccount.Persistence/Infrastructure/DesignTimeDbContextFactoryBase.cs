using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MerchantAccount.Persistence.Infrastructure;

public abstract class DesignTimeDbContextFactoryBase<TContext> :
	IDesignTimeDbContextFactory<TContext>
	where TContext : DbContext
{
	private const string ConnectionStringName = "Database";
	private const string AspNetCoreEnvironment = "ASPNETCORE_ENVIRONMENT";

	public TContext CreateDbContext(string[] args)
	{
		// string basePath = Path.Combine(Environment.CurrentDirectory, "..", "DotnetReactCA.Web");;
		string basePath = Directory.GetCurrentDirectory() + string.Format("{0}..{0}MerchantAccount.Web", Path.DirectorySeparatorChar);
		return Create(basePath, Environment.GetEnvironmentVariable(AspNetCoreEnvironment));
	}

	protected abstract TContext CreateNewInstance(DbContextOptions<TContext> options);

	private TContext Create(string basePath, string environmentName)
	{
		IConfigurationRoot configuration = new ConfigurationBuilder()
			.SetBasePath(basePath)
			.AddJsonFile("appsettings.json")
			.AddJsonFile($"appsettings.Development.json", optional: true)
			.AddJsonFile($"appsettings.{environmentName}.json", optional: true)
			.AddEnvironmentVariables()
			.Build();

		string connectionString = configuration.GetConnectionString(ConnectionStringName);

		return Create(connectionString);
	}

	private TContext Create(string connectionString)
	{
		if (string.IsNullOrEmpty(connectionString))
		{
			throw new ArgumentException($"Connection string '{ConnectionStringName}' is null or empty.", nameof(connectionString));
		}

		Console.WriteLine($"DesignTimeDbContextFactoryBase.Create(string): Connection string: '{connectionString}'.");

		DbContextOptionsBuilder<TContext> optionsBuilder = new();

		_ = optionsBuilder.UseNpgsql(connectionString);

		return CreateNewInstance(optionsBuilder.Options);
	}
}