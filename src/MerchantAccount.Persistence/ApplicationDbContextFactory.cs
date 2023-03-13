using MerchantAccount.Persistence.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace MerchantAccount.Persistence;

public class ApplicationDbContextFactory : DesignTimeDbContextFactoryBase<ApplicationDbContext>
{
	protected override ApplicationDbContext CreateNewInstance(DbContextOptions<ApplicationDbContext> options)
	{
		return new ApplicationDbContext(options);
	}
}