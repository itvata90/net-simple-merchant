using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Commands.CreateMember;
using MerchantAccount.Application.Members.Models;
using FluentAssertions;
using FluentValidation.Results;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.CreateMember;

public class CreateMemberCommandHandlerTest
{
	private readonly Mock<IMemberRepository> _memberRepositoryMock;
	private readonly IMapper _mapper;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;

	public CreateMemberCommandHandlerTest()
	{
		_memberRepositoryMock = new();
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new();
	}

	[Fact]
	public async void Handle_GivenValidRequest_ShouldCreateMember()
	{
		CreateMemberCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_memberRepositoryMock.Object,
			_mapper);
		CreateMemberCommand command = new(
			"username",
			"first",
			"last");

		MemberDto result = await handler.Handle(command, CancellationToken.None);

		_ = result.Should().BeOfType(typeof(MemberDto));
	}

	[Fact]
	public async void Handle_GivenInvalidRequest_ShouldReturnErrorMessage()
	{
		CreateMemberCommandValidator validator = new(_applicationDbContextMock.Object, _memberRepositoryMock.Object);

		ValidationResult validatorResult = await validator.ValidateAsync(new CreateMemberCommand(null, "first", "last"));

		_ = validatorResult.Errors.FirstOrDefault().ErrorMessage.Should().NotBeNull();
	}
}