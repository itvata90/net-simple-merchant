using MerchantAccount.Application.Members.Commands.DeleteMember;
using MerchantAccount.Domain.Entities;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.DeleteMember;

public class DeleteMemberCommandHandlerTest : TestBaseFixture
{
	[Fact]
	public async void Handle_GivenValidRequest_ShouldDeleteMember()
	{
		Member member = new()
		{
			Id = 100,
			Username = "test",
			FirstName = "test",
			LastName = "test",
		};

		MemberRepository.Add(member);
		await MemberRepository.SaveChangesAsync(CancellationToken.None);

		// Should be added to DB
		var memberResult = await MemberRepository.GetByIdAsync(100);
		Assert.NotNull(memberResult);

		DeleteMemberCommandHandler handler = new(MemberRepository, Mapper);

		await handler.Handle(new DeleteMemberCommand(100), CancellationToken.None);

		// should be deleted
		memberResult = await MemberRepository.GetByIdAsync(100);
		Assert.Null(memberResult);
	}
}