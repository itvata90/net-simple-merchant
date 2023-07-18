using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Persistence;

namespace MerchantAccount.Web
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var host = CreateWebHostBuilder(args).UseIIS().Build();

			/*
			 * In PostgreSQL 6.0 has a break change relate to timestamp with error below:
			 * 'Cannot write DateTime with Kind=Unspecified to PostgreSQL type 'timestamp with time zone', only UTC is supported.
			 * Note that it's not possible to mix DateTimes with different Kinds in an array/range.'
			 * To fix this issue we need to set EnableLegacyTimestampBehavior to true.
			 */
			AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

			using (var scope = host.Services.CreateScope())
			{
				try
				{
					IApplicationDbContext? context = scope.ServiceProvider.GetService<IApplicationDbContext>();

					ApplicationDbContext concreteContext = (ApplicationDbContext)context!;
					concreteContext.Database.Migrate();

					ApplicationDbInitializer.Initialize(concreteContext);
				}
				catch (Exception ex)
				{
					var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
					logger.LogError(ex, "An error occurred while migrating or initializing the database.");
				}
			}

			host.Run();
		}

		public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.ConfigureKestrel(serverOptions =>
				{
					serverOptions.AddServerHeader = false;
					serverOptions.Limits.MaxConcurrentConnections = 100;
					serverOptions.Limits.MaxConcurrentUpgradedConnections = 100;
					serverOptions.Limits.MaxRequestBodySize = 10485760;  // 10 MB
					serverOptions.Limits.MinRequestBodyDataRate = new MinDataRate(bytesPerSecond: 1024, gracePeriod: TimeSpan.FromSeconds(3));
					serverOptions.Limits.MinResponseDataRate = new MinDataRate(bytesPerSecond: 1024, gracePeriod: TimeSpan.FromSeconds(3));
					serverOptions.Limits.KeepAliveTimeout = TimeSpan.FromSeconds(120);
					serverOptions.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(60);
				})
				.UseStartup<Startup>();
	}
}