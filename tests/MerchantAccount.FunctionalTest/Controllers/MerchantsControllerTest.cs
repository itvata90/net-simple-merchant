using System.Collections.Generic;
using System.Threading;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using MerchantAccount.Web.Controllers;
using Xunit;
using MerchantAccount.Application.Merchants.Queries.GetMerchants;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Application.Merchants.Commands.UpdateMerchant;

namespace MerchantAccount.FunctionalTest.Controllers;

public class MerchantsAccountControllerTest
{
	private readonly Mock<IMediator> _mock;

	public MerchantsAccountControllerTest()
	{
		_mock = new Mock<IMediator>();
	}

	[Fact]
	public async void Get_Merchants()
	{
		var response = new List<MerchantDto>()
		{
			{ new MerchantDto { Id = 1, Name = "name_1" } },
			{ new MerchantDto { Id = 2, Name = "name_2" } },
		};

		_mock.Setup(_ => _.Send(It.Is<GetMerchantsQuery>(q => q.PageLimit == 2 && q.PageOffset == 2), It.IsAny<CancellationToken>()))
			.ReturnsAsync(response)
			.Verifiable();

		var sut = new MerchantsController(_mock.Object);

		var actionResult = await sut.GetMerchants(2, 2);

		actionResult.Result.Should().BeOfType<OkObjectResult>()
			.Which.Value.Should().BeSameAs(response);

		_mock.VerifyAll();
	}

	[Fact]
	public async void Put_Merchant()
	{
		var response = new MerchantDto
		{
			Id = 1,
			Name = "name_1_updated",
			Province = "province",
			District = "district",
			Street = "test",
			Phone = "12345678",
			Status = "status",
			Email = "test"
		};

		var command = new UpdateMerchantCommand()
		{
			Id = 1,
			OwnerId = 1,
			Name = response.Name,
			Province = response.Province,
			District = response.District,
			Street = response.Street,
			Phone = response.Phone,
			Status = response.Status,
			Email = response.Email
		};

		_mock.Setup(_ => _.Send(It.Is<UpdateMerchantCommand>(s => s.Id == command.Id), It.IsAny<CancellationToken>()))
			.ReturnsAsync(response)
			.Verifiable();

		var sut = new MerchantsController(_mock.Object);

		var actionResult = await sut.UpdateMerchant(command.Id, command);

		actionResult.Result.Should().BeOfType<OkObjectResult>()
			.Which.Value.Should().BeSameAs(response);

		_mock.VerifyAll();
	}
}
