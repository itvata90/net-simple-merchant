using MerchantAccount.Application.Interfaces;
using MerchantAccount.Persistence.Interceptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MerchantAccount.Persistence.Repositories;
using MerchantAccount.Application.Interfaces;
namespace MerchantAccount.Persistence;

public static class DependencyInjection
{
	public static IServiceCollection AddPersistence(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		_ = services.AddSingleton<UpdateAuditableEntitiesInterceptor>();
		_ = services.AddScoped<IMemberRepository, MemberRepository>();
		_ = services.AddScoped<IMemberDetailRepository, MemberDetailRepository>();
		_ = services.AddScoped<IMerchantRepository, MerchantRepository>();
		// Add DbContext using ProgreSQL (NPGSQL) provider
		_ = services.AddDbContext<IApplicationDbContext, ApplicationDbContext>((sp, options) =>
		{
			var auditableInterceptor = sp.GetService<UpdateAuditableEntitiesInterceptor>();
			string connectionString = configuration.GetConnectionString("Database");
			options.UseNpgsql(connectionString).AddInterceptors(auditableInterceptor);
		});

		return services;
	}
}