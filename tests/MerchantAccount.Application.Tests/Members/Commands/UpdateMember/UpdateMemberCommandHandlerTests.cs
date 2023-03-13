using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Commands.UpdateMember;
using MerchantAccount.Application.Members.Models;
using MerchantAccount.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.UpdateMember;

public class UpdateMemberCommandHandlerTest
{
	private readonly IMapper _mapper;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;
	private readonly Mock<IMemberRepository> _memberRepositoryMock;

	public UpdateMemberCommandHandlerTest()
	{
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new Mock<IApplicationDbContext>();
		_memberRepositoryMock = new Mock<IMemberRepository>();
	}

	[Fact]
	public async void Handle_GivenValidRequest_Should_UpdateMember()
	{
		int id = 1;
		Member member = new()
		{
			Id = id,
			Username = "test",
			FirstName = "test",
			LastName = "test",
		};

		_ = _memberRepositoryMock.Setup(x => x.GetByIdAsync(id)).Returns(Task.FromResult(member));

		UpdateMemberCommand command = new(
				 1,
				 "username",
				 "first",
				 "last");
		UpdateMemberCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_memberRepositoryMock.Object,
			_mapper);

		MemberDto result = await handler.Handle(command, CancellationToken.None);

		_ = result.Should().BeEquivalentTo(_mapper.Map<MemberDto>(member));
	}

	[Fact]
	public async void Handle_GivenInvalidRequestId_ShouldThrowNotFound()
	{
		UpdateMemberCommand command = new(
				 1,
				 "username",
				 "first",
				 "last");
		UpdateMemberCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_memberRepositoryMock.Object,
			_mapper);

		_ = Assert.ThrowsAsync<NotFoundException>(async () => await handler.Handle(command, CancellationToken.None));
	}
}