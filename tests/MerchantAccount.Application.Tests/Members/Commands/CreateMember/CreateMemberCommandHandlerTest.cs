using MerchantAccount.Application.Members.Commands.CreateMember;
using MerchantAccount.Application.Members.Models;
using FluentAssertions;
using FluentValidation.Results;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.CreateMember;

public class CreateMemberCommandHandlerTest : TestBaseFixture
{
	[Fact]
	public async void Handle_GivenValidRequest_ShouldCreateMember()
	{
		var sut = new CreateMemberCommandHandler(MemberRepository, Mapper);

		var response = new MemberDto()
		{
			Id = 3, // existing is 2 already
			FirstName = "FirstName",
			LastName = "LastName",
			Username = "UserName"
		};

		var result = await sut.Handle(new CreateMemberCommand() { Username = response.Username, FirstName = response.FirstName, LastName = response.LastName }, CancellationToken.None);

		result.Should().BeEquivalentTo(response);
	}

	[Fact]
	public async void Handle_GivenInvalidRequest_ShouldReturnErrorMessage()
	{
		var validator = new CreateMemberCommandValidator(MemberRepository);

		ValidationResult validatorResult = await validator.ValidateAsync(new CreateMemberCommand() { Username = string.Empty, FirstName = "first", LastName = "last" });

		validatorResult.Errors.FirstOrDefault().ErrorMessage.Should().Be("'Username' must not be empty.");
	}
}