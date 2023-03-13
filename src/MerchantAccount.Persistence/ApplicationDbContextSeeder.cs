namespace MerchantAccount.Persistence;

public class ApplicationDbContextSeeder
{
	public static void Seed(ApplicationDbContext context)
	{
		/*
		** TODO: Add any data seed requirements here.
		*/
		_ = context.SaveChanges();
	}
}