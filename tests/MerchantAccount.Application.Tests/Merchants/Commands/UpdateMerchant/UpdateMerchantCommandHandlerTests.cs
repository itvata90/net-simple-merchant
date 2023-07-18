using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Merchants.Commands.UpdateMerchant;
using MerchantAccount.Application.Merchants.Models;
using FluentAssertions;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Commands.UpdateMerchant;

public class UpdateMerchantCommandHandlerTest : TestBaseFixture
{
	[Fact]
	public async void Handle_GivenValidRequest_Should_UpdateMerchant()
	{
		var response = new MerchantDto()
		{
			Id = 1,
			Name = "name_1_updated",
			Province = "province_1_updated",
			District = "district_1_updated",
			Street = "street_1_updated",
			Email = "merchant@test_1.com_updated",
			Phone = "0001",
			Status = "status_test",
			OwnerId = 2
		};

		UpdateMerchantCommand command = new()
		{
			Id = 1,
			Name = "name_1_updated",
			Province = "province_1_updated",
			District = "district_1_updated",
			Street = "street_1_updated",
			Email = "merchant@test_1.com_updated",
			Phone = "0001",
			Status = "status_test",
			OwnerId = 2
		};

		UpdateMerchantCommandHandler handler = new(MerchantRepository, Mapper);

		MerchantDto result = await handler.Handle(command, CancellationToken.None);

		result.Should().BeEquivalentTo(response);
	}

	[Fact]
	public async void Handle_GivenInvalidRequestId_ShouldThrowNotFound()
	{
		// id = 100 is not existing
		UpdateMerchantCommand command = new()
		{
			Id = 00,
			Name = "name1",
			Province = "province1",
			District = "district1",
			Street = "street1",
			Email = "email1",
			Phone = "phone1",
			Status = "MerchantStatus.Active",
			OwnerId = 1
		};
		UpdateMerchantCommandHandler handler = new(MerchantRepository, Mapper);

		await Assert.ThrowsAsync<NotFoundException>(async () => await handler.Handle(command, CancellationToken.None));
	}
}