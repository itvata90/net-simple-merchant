using MerchantAccount.Application.Merchants.Commands.CreateMerchant;
using MerchantAccount.Application.Merchants.Models;
using FluentAssertions;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Commands.CreateMerchant;

public class CreateMerchantCommandHandlerTest : TestBaseFixture
{
	[Fact]
	public async void Handle_GivenValidRequest_ShouldCreateMerchant()
	{
		CreateMerchantCommandHandler handler = new(MerchantRepository, Mapper);
		CreateMerchantCommand command = new()
		{
			OwnerId = 1,
			Name = "name",
			Province = "province",
			District = "district",
			Street = "street",
			Email = "email",
			Phone = "phone",
			Status = "status"
		};

		MerchantDto result = await handler.Handle(command, CancellationToken.None);

		result.Should().BeOfType(typeof(MerchantDto)); // Todo: should compare the response object
	}
}