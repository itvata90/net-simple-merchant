using MerchantAccount.Application.Members.Models;
using MerchantAccount.Application.Members.Queries.GetMembers;
using MerchantAccount.Domain.Entities;
using FluentAssertions;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Queries;

[Collection("QueryCollection")]
public class GetMembersQueryHandlerTests : TestBaseFixture
{
	[Fact]
	public async Task GetMemberDetail_ShouldReturnAllRecords()
	{
		MemberRepository.Add(new Member()
		{
			Username = "existing_user_3",
			FirstName = "test_3",
			LastName = "test_3",
			Id = 3
		});

		MemberRepository.Add(new Member()
		{
			Username = "existing_user_4",
			FirstName = "test_4",
			LastName = "test_4",
			Id = 4
		});

		MemberRepository.Add(new Member()
		{
			Username = "existing_user_5",
			FirstName = "test_5",
			LastName = "test_5",
			Id = 5
		});

		await MemberRepository.SaveChangesAsync(CancellationToken.None);

		// There're 5 records of Members. 2 when seeding data, 3 created as above for this unit tests
		GetMembersQueryHandler handler = new(MemberRepository, Mapper);

		IEnumerable<MemberDto> result = await handler.Handle(new GetMembersQuery(2, 2), CancellationToken.None);

		result.ToList()
			 .Should().NotBeEmpty()
				 .And.HaveCount(2);

		result = await handler.Handle(new GetMembersQuery(5, 2), CancellationToken.None);

		result.ToList()
			 .Should().NotBeEmpty()
				 .And.HaveCount(3);
	}
}