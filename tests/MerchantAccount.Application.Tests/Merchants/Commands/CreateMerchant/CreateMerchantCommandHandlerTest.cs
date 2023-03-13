using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Commands.CreateMerchant;
using MerchantAccount.Application.Merchants.Models;
using FluentAssertions;
using FluentValidation.Results;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Commands.CreateMerchant;

public class CreateMerchantCommandHandlerTest
{
	private readonly Mock<IMerchantRepository> _merchantRepositoryMock;
	private readonly IMapper _mapper;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;

	public CreateMerchantCommandHandlerTest()
	{
		_merchantRepositoryMock = new();
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new();
	}

	[Fact]
	public async void Handle_GivenValidRequest_ShouldCreateMerchant()
	{
		CreateMerchantCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_merchantRepositoryMock.Object,
			_mapper);
		CreateMerchantCommand command = new(
			1,
			"name",
			"province",
			"district",
			"street",
			"email",
			"phone",
			"status"
			);

		MerchantDto result = await handler.Handle(command, CancellationToken.None);

		_ = result.Should().BeOfType(typeof(MerchantDto));
	}
}