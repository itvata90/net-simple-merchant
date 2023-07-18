using MerchantAccount.Application.Merchants.Commands.CreateMerchant;
using FluentValidation.TestHelper;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Commands.CreateMerchant;

public class CreateMerchantCommandValidatorTest : TestBaseFixture
{
	private readonly CreateMerchantCommandValidator _validator;

	public CreateMerchantCommandValidatorTest()
	{
		_validator = new CreateMerchantCommandValidator(MemberRepository, MerchantRepository);
	}

	[Fact]
	public async void ShouldHaveValidationErrorForUsername()
	{
		// not existing ownerid = 1000
		CreateMerchantCommand command = new() { OwnerId = 1000 };
		TestValidationResult<CreateMerchantCommand> result = await _validator.TestValidateAsync(command);

		_ = result.ShouldHaveValidationErrorFor(_ => _.OwnerId)
				 .WithErrorMessage("Owner Must Be Exist.");
	}
}