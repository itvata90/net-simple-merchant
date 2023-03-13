using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Commands.UpdateMember;
using MerchantAccount.Domain.Entities;
using FluentValidation.TestHelper;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Members.Commands.UpdateMember;

public class UpdateMemberCommandValidatorTests
{
	private readonly UpdateMemberCommandValidator _validator;
	private readonly Mock<IApplicationDbContext> _contextMock;
	private readonly Mock<IMemberRepository> _memberRepositoryMock;

	public UpdateMemberCommandValidatorTests()
	{
		_contextMock = new();
		_memberRepositoryMock = new();
		_validator = new(_contextMock.Object, _memberRepositoryMock.Object);
	}

	[Fact]
	public async Task ShouldHaveValidationForUsername()
	{
		// Arrange
		string errorMessage = "Username is already used.";
		string username = "username1";
		Member member = new()
		{
			Id = 2,
			Username = username,
			FirstName = "First Name",
			LastName = "Last Name"
		};

		_ = _memberRepositoryMock.Setup(x => x.GetByUsername(username)).Returns(member);
		UpdateMemberCommand command = new(1, username, "John", "Doe");

		// Act
		TestValidationResult<UpdateMemberCommand> result = _validator.TestValidate(command);

		// Assert
		_ = result.ShouldHaveValidationErrorFor(member => new { member.Id, member.Username })
				 .WithErrorMessage(errorMessage);
	}
}