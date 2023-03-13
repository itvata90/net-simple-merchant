using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Application.Merchants.Queries.GetMerchantById;
using MerchantAccount.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;
namespace MerchantAccount.Application.Tests.Merchants.Queries;

[Collection("QueryCollection")]
public class GetMerchantByIdQueryHandlerTests
{
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;
	private readonly IMapper _mapper;
	private readonly Mock<IMerchantRepository> _merchantRepositoryMock;

	public GetMerchantByIdQueryHandlerTests()
	{
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new();
		_merchantRepositoryMock = new();
	}

	[Fact]
	public async Task GetMerchantBy_ValidId_ShouldReturnMerchant()
	{
		// Arrange
		int id = 1;
		Merchant merchant = new()
		{
			Id = 1,
			Name = "name",
			Province = "province",
			District = "district",
			Street = "street",
			Email = "email",
			Phone = "phone",
			Status = "status"
		};

		_ = _merchantRepositoryMock.Setup(x => x.GetByIdAsync(id)).Returns(Task.FromResult(merchant));

		GetMerchantByIdQuery query = new(1);

		GetMerchantByIdQueryHandler handler = new(
			_applicationDbContextMock.Object,
			_merchantRepositoryMock.Object,
			_mapper);

		// Act
		MerchantDto result = await handler.Handle(query, CancellationToken.None);

		// Assert
		_ = result.Should().BeOfType<MerchantDto>();
		_ = result.Id.Should().Be(1);
	}
}