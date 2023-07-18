using MerchantAccount.Application.Members.Commands.UpdateMember;
using MerchantAccount.Application.Members.Models;
using FluentAssertions;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.UpdateMember;

public class UpdateMemberCommandHandlerTest : TestBaseFixture
{
	[Fact]
	public async void Handle_GivenValidRequest_Should_UpdateMember()
	{
		MemberDto member = new()
		{
			Id = 1,
			Username = "username_updated",
			FirstName = "first_updated",
			LastName = "last_updated",
		};

		UpdateMemberCommand command = new()
		{
			Id = 1,
			Username = "username_updated",
			FirstName = "first_updated",
			LastName = "last_updated"
		};

		UpdateMemberCommandHandler handler = new(MemberRepository, Mapper);

		MemberDto result = await handler.Handle(command, CancellationToken.None);

		result.Should().BeEquivalentTo(member);
	}
}