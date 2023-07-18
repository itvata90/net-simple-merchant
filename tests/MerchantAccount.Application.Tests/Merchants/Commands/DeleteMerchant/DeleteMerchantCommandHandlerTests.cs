using MerchantAccount.Application.Merchants.Commands.DeleteMerchant;
using MerchantAccount.Domain.Entities;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Commands.DeleteMerchant;

public class DeleteMerchantCommandHandlerTest : TestBaseFixture
{
	[Fact]
	public async void Handle_GivenValidRequest_ShouldDeleteMerchant()
	{
		Context.Add(new Merchant()
		{
			Id = 1001,
			Name = "name_1001",
			Province = "province_1001",
			District = "district_1001",
			Street = "street_1001",
			Email = "merchant@test_1001.com",
			Phone = "0001",
			Status = "status_test",
			OwnerId = 2
		});

		await Context.SaveChangesAsync(CancellationToken.None);

		// Should be added to DB
		var merchant1001 = await MerchantRepository.GetByIdAsync(1001);
		Assert.NotNull(merchant1001);

		// Delete id 1001, make sure can not get id=1 after deleting
		DeleteMerchantCommandHandler handler = new(MerchantRepository);

		await handler.Handle(new DeleteMerchantCommand(1001), CancellationToken.None);

		// Should be deleted
		merchant1001 = await MerchantRepository.GetByIdAsync(1001);
		Assert.Null(merchant1001);
	}
}