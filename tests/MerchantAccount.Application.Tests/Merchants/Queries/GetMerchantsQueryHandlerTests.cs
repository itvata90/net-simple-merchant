using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Application.Merchants.Queries.GetMerchants;
using MerchantAccount.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Queries;

[Collection("QueryCollection")]
public class GetMerchantsQueryHandlerTests
{
	private readonly IMapper _mapper;

	private readonly Mock<IMerchantRepository> _merchantRepositoryMock;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;

	public GetMerchantsQueryHandlerTests()
	{
		_merchantRepositoryMock = new();
		_applicationDbContextMock = new();
		_mapper = MapperFactory.Create();
	}

	[Fact]
	public async Task GetMerchantDetail_ShouldReturnAllRecords()
	{
		List<Merchant> merchants = new()
		{
			new Merchant()
			{
				Id = 1,
				Name = "name",
				Province = "province",
				District = "district",
				Street = "street",
				Email = "email",
				Phone = "phone",
				Status = "status"
			},
			new Merchant()
			{
				Id = 2,
				Name = "name2",
				Province = "province2",
				District = "district2",
				Street = "street2",
				Email = "email2",
				Phone = "phone2",
				Status = "status2"
			}
		};

		_ = _merchantRepositoryMock.Setup(x => x.GetAllAsync(0, 0)).Returns(Task.FromResult(merchants.AsEnumerable()));

		GetMerchantsQuery query = new(0, 0);
		GetMerchantsQueryHandler handler = new(_applicationDbContextMock.Object, _merchantRepositoryMock.Object, _mapper);

		IEnumerable<MerchantDto> result = await handler.Handle(query, CancellationToken.None);

		_ = result.ToList()
				 .Should().NotBeEmpty()
					 .And.HaveCount(2);
	}
}