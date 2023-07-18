using Microsoft.EntityFrameworkCore;
using MerchantAccount.Persistence;
using MerchantAccount.Domain.Entities;
using MerchantAccount.Application.Interfaces;

namespace MerchantAccount.Application.Tests
{
	public static class DbContextFactory
	{
		public static ApplicationDbContext Create()
		{
			var options = new DbContextOptionsBuilder<ApplicationDbContext>()
				.UseInMemoryDatabase(Guid.NewGuid().ToString())
				.Options;

			var context = new ApplicationDbContext(options);
			context.Database.EnsureCreated();

			SeedEverything(context).Wait();

			return context;
		}

		public static async Task SeedEverything(IApplicationDbContext context)
		{
			// seed if needed
			context.Members.Add(new Member()
			{
				Username = "existing_user_1",
				FirstName = "test_1",
				LastName = "test_1",
				Id = 1
			});

			context.Members.Add(new Member()
			{
				Username = "existing_user_2",
				FirstName = "test_2",
				LastName = "test_2",
				Id = 2
			});

			context.Merchants.Add(new Merchant()
			{
				Id = 1,
				Name = "name_1",
				Province = "province_1",
				District = "district_1",
				Street = "street_1",
				Email = "merchant@test_1.com",
				Phone = "0001",
				Status = "status_test",
				OwnerId = 2
			});

			context.Merchants.Add(new Merchant()
			{
				Id = 2,
				Name = "name_2",
				Province = "province_2",
				District = "district_2",
				Street = "street_2",
				Email = "merchant@test_2.com",
				Phone = "0001",
				Status = "status_test",
				OwnerId = 1
			});

			await context.SaveChangesAsync(CancellationToken.None);
		}

		public static void Destroy(ApplicationDbContext context)
		{
			context.Database.EnsureDeleted();
			context.Dispose();
		}
	}
}