using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Commands.DeleteMember;
using MerchantAccount.Domain.Entities;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.DeleteMember;

public class DeleteMemberCommandHandlerTest
{
	private readonly Mock<IMemberRepository> _memberRepositoryMock;
	private readonly IMapper _mapper;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;

	public DeleteMemberCommandHandlerTest()
	{
		_memberRepositoryMock = new();
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new();
	}

	[Fact]
	public async void Handle_GivenValidRequest_ShouldDeleteMember()
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

		_ = _memberRepositoryMock.Setup(x => x.GetById(id)).Returns(member);
		_ = _memberRepositoryMock.Setup(x => x.GetByIdAsync(id)).Returns(Task.FromResult(member));
		DeleteMemberCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_memberRepositoryMock.Object,
			_mapper);
		DeleteMemberCommand command = new(1);

		// Act
		_ = await handler.Handle(command, CancellationToken.None);

		// Assert
		_memberRepositoryMock.Verify(x => x.Remove(It.Is<Member>(member => member.Id == id)), Times.Once());
	}
}