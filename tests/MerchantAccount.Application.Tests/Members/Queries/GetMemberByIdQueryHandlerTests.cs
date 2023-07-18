using MerchantAccount.Application.Members.Models;
using MerchantAccount.Application.Members.Queries.GetMemberById;
using FluentAssertions;
using Xunit;
namespace MerchantAccount.Application.Tests.Members.Queries;

[Collection("QueryCollection")]
public class GetMemberByIdQueryHandlerTests : TestBaseFixture
{
	[Fact]
	public async Task GetMemberBy_ValidId_ShouldReturnMember()
	{
		GetMemberByIdQueryHandler handler = new(MemberRepository, Mapper);

		// Act
		MemberDto result = await handler.Handle(new GetMemberByIdQuery(1), CancellationToken.None);

		// Assert
		result.Should().BeOfType<MemberDto>();
		result.Id.Should().Be(1);
	}
}