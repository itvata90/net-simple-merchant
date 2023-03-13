using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Commands.CreateMember;
using FluentValidation.TestHelper;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.CreateMember;

public class CreateMemberCommandValidatorTest
{
	private readonly CreateMemberCommandValidator _validator;
	private readonly Mock<IApplicationDbContext> _contextMock;
	private readonly Mock<IMemberRepository> _memberRepositoryMock;

	public CreateMemberCommandValidatorTest()
	{
		_contextMock = new();
		_memberRepositoryMock = new();
		_validator = new(_contextMock.Object, _memberRepositoryMock.Object);
	}

	[Fact]
	public void ShouldHaveValidationErrorForUsername()
	{
		CreateMemberCommand command = new(null, "first", "last");
		TestValidationResult<CreateMemberCommand> result = _validator.TestValidate(command);

		_ = result.ShouldHaveValidationErrorFor(_ => _.Username)
				 .WithErrorMessage("Username is already used.");
	}
}