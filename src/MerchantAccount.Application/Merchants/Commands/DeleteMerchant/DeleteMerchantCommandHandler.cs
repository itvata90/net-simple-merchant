using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.DeleteMerchant;

public class DeleteMerchantCommandHandler : IRequestHandler<DeleteMerchantCommand>
{
	private readonly IMerchantRepository _merchantRepository;

	public DeleteMerchantCommandHandler(IMerchantRepository merchantRepository)
	{
		_merchantRepository = merchantRepository;
	}

	public async Task<Unit> Handle(DeleteMerchantCommand request, CancellationToken cancellationToken)
	{
		int id = request.Id;
		Merchant? entity = await _merchantRepository.GetByIdAsync(id);

		if (entity == null)
		{
			throw new NotFoundException("Merchant", id);
		}

		_merchantRepository.Remove(entity);

		_ = await _merchantRepository.SaveChangesAsync(cancellationToken);

		return Unit.Value;
	}
}