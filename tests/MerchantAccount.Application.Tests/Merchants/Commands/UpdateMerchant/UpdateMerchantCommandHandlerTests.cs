using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Commands.UpdateMerchant;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Domain.Entities;
using MerchantAccount.Domain.Enums;
using FluentAssertions;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Commands.UpdateMerchant;

public class UpdateMerchantCommandHandlerTest
{
	private readonly IMapper _mapper;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;
	private readonly Mock<IMerchantRepository> _merchantRepositoryMock;

	public UpdateMerchantCommandHandlerTest()
	{
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new Mock<IApplicationDbContext>();
		_merchantRepositoryMock = new Mock<IMerchantRepository>();
	}

	[Fact]
	public async void Handle_GivenValidRequest_Should_UpdateMerchant()
	{
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

		UpdateMerchantCommand command = new(
			1,
			1,
			"name1",
			"province1",
			"district1",
			"street1",
			"email1",
			"phone1",
			"status1");
		UpdateMerchantCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_merchantRepositoryMock.Object,
			_mapper);

		MerchantDto result = await handler.Handle(command, CancellationToken.None);

		_ = result.Should().BeEquivalentTo(_mapper.Map<MerchantDto>(merchant));
	}

	[Fact]
	public async void Handle_GivenInvalidRequestId_ShouldThrowNotFound()
	{
		UpdateMerchantCommand command = new(
			1,
			1,
			"name1",
			"province1",
			"district1",
			"street1",
			"email1",
			"phone1",
			MerchantStatus.Active);
		UpdateMerchantCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_merchantRepositoryMock.Object,
			_mapper);

		_ = Assert.ThrowsAsync<NotFoundException>(async () => await handler.Handle(command, CancellationToken.None));
	}
}