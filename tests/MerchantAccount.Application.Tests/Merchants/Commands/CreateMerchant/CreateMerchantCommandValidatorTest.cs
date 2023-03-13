// using MerchantAccount.Application.Interface
// using DotnetReactCA.Application.Merchants.Commands.CreateMerchant;
// using FluentValidation.TestHelper;
// using Moq;
// using Xunit;

// namespace DotnetReactCA.Application.Tests.Merchants.Commands.CreateMerchant;

// public class CreateMerchantCommandValidatorTest
// {
// 	private readonly CreateMerchantCommandValidator _validator;
// 	private readonly Mock<IApplicationDbContext> _contextMock;
// 	private readonly Mock<IMerchantRepository> _merchantRepositoryMock;

// 	public CreateMerchantCommandValidatorTest()
// 	{
// 		_contextMock = new();
// 		_merchantRepositoryMock = new();
// 		_validator = new(_contextMock.Object, _merchantRepositoryMock.Object);
// 	}
// }