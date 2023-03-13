using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Models;
using MerchantAccount.Application.Members.Queries.GetMemberById;
using MerchantAccount.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;
namespace MerchantAccount.Application.Tests.Members.Queries;

[Collection("QueryCollection")]
public class GetMemberByIdQueryHandlerTests
{
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;
	private readonly IMapper _mapper;
	private readonly Mock<IMemberRepository> _memberRepositoryMock;

	public GetMemberByIdQueryHandlerTests()
	{
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new();
		_memberRepositoryMock = new();
	}

	[Fact]
	public async Task GetMemberBy_ValidId_ShouldReturnMember()
	{
		// Arrange
		int id = 1;
		Member member = new()
		{
			Id = 1,
			Username = "test",
			FirstName = "test",
			LastName = "test",
		};

		_ = _memberRepositoryMock.Setup(x => x.GetByIdAsync(id)).Returns(Task.FromResult(member));

		GetMemberByIdQuery query = new(1);

		GetMemberByIdQueryHandler handler = new(
			_applicationDbContextMock.Object,
			_memberRepositoryMock.Object,
			_mapper);

		// Act
		MemberDto result = await handler.Handle(query, CancellationToken.None);

		// Assert
		_ = result.Should().BeOfType<MemberDto>();
		_ = result.Id.Should().Be(1);
	}
}