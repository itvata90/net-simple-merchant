using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Models;
using MerchantAccount.Application.Members.Queries.GetMembers;
using MerchantAccount.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Queries;

[Collection("QueryCollection")]
public class GetMembersQueryHandlerTests
{
	private readonly IMapper _mapper;

	private readonly Mock<IMemberRepository> _memberRepositoryMock;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;

	public GetMembersQueryHandlerTests()
	{
		_memberRepositoryMock = new();
		_applicationDbContextMock = new();
		_mapper = MapperFactory.Create();
	}

	[Fact]
	public async Task GetMemberDetail_ShouldReturnAllRecords()
	{
		List<Member> members = new()
		{
			new Member()
			{
				Id = 1,
				Username = "test",
				FirstName = "first",
				LastName = "last",
			},
			new Member()
			{
				Id = 2,
				Username = "test2",
				FirstName = "first2",
				LastName = "last2",
			}
		};

		_ = _memberRepositoryMock.Setup(x => x.GetAllAsync(0, 0)).Returns(Task.FromResult(members.AsEnumerable()));

		GetMembersQuery query = new(0, 0);
		GetMembersQueryHandler handler = new(_applicationDbContextMock.Object, _memberRepositoryMock.Object, _mapper);

		IEnumerable<MemberDto> result = await handler.Handle(query, CancellationToken.None);

		_ = result.ToList()
			 .Should().NotBeEmpty()
				 .And.HaveCount(2);
	}
}