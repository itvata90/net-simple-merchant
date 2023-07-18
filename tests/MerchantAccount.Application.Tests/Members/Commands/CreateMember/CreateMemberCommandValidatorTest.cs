using MerchantAccount.Application.Members.Commands.CreateMember;
using FluentValidation.TestHelper;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.CreateMember;

public class CreateMemberCommandValidatorTest : TestBaseFixture
{
	private readonly CreateMemberCommandValidator _validator;

	public CreateMemberCommandValidatorTest()
	{
		_validator = new CreateMemberCommandValidator(MemberRepository);
	}

	[Fact]
	public void ShouldHaveValidationErrorForUsername()
	{
		CreateMemberCommand command = new() { Username = "existing_user_1", FirstName = "first", LastName = "last" };
		TestValidationResult<CreateMemberCommand> result = _validator.TestValidate(command);

		_ = result.ShouldHaveValidationErrorFor(_ => _.Username)
				 .WithErrorMessage("Username is already used.");
	}
}