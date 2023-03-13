using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Commands.DeleteMerchant;
using MerchantAccount.Domain.Entities;
using Moq;
using Xunit;

namespace MerchantAccount.Application.Tests.Merchants.Commands.DeleteMerchant;

public class DeleteMerchantCommandHandlerTest
{
	private readonly Mock<IMerchantRepository> _merchantRepositoryMock;
	private readonly IMapper _mapper;
	private readonly Mock<IApplicationDbContext> _applicationDbContextMock;

	public DeleteMerchantCommandHandlerTest()
	{
		_merchantRepositoryMock = new();
		_mapper = MapperFactory.Create();
		_applicationDbContextMock = new();
	}

	[Fact]
	public async void Handle_GivenValidRequest_ShouldDeleteMerchant()
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
		DeleteMerchantCommandHandler handler = new(
			_applicationDbContextMock.Object,
			_merchantRepositoryMock.Object);
		DeleteMerchantCommand command = new(1);

		// Act
		_ = await handler.Handle(command, CancellationToken.None);

		// Assert
		_merchantRepositoryMock.Verify(x => x.Remove(It.Is<Merchant>(merchant => merchant.Id == id)), Times.Once());
	}
}