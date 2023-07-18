using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Application.Merchants.Queries.GetMerchantById;
using FluentAssertions;
using Xunit;
namespace MerchantAccount.Application.Tests.Merchants.Queries;

[Collection("QueryCollection")]
public class GetMerchantByIdQueryHandlerTests : TestBaseFixture
{
	[Fact]
	public async Task GetMerchantBy_ValidId_ShouldReturnMerchant()
	{
		GetMerchantByIdQueryHandler handler = new(MerchantRepository, Mapper);

		// Act
		MerchantDto result = await handler.Handle(new GetMerchantByIdQuery(1), CancellationToken.None);

		// Assert
		result.Should().BeOfType<MerchantDto>();
		result.Id.Should().Be(1);
	}
}