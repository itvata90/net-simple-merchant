namespace MerchantAccount.Persistence;

public class ApplicationDbInitializer
{
	public static void Initialize(ApplicationDbContext context)
	{
		ApplicationDbInitializer initializer = new();
		initializer.SeedEverything(context);
	}

	public void SeedEverything(ApplicationDbContext context)
	{
		_ = context.Database.EnsureCreated();

		// Check if the database has data, and if so abort. Otherwise populate the default data.
	}
}