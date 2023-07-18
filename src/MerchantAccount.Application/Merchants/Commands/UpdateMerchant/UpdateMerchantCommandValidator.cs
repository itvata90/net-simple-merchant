using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Merchants.Commands.UpdateMerchant;

public class UpdateMerchantCommandValidator : AbstractValidator<UpdateMerchantCommand>
{
	private readonly IMerchantRepository _merchantRepository;

	public UpdateMerchantCommandValidator(
		IMerchantRepository merchantRepository)
	{
		_merchantRepository = merchantRepository;

		_ = RuleFor(_ => _.OwnerId)
		 .MustAsync((x, CancellationToken) => MerchantMustBeExist(x))
		 .WithMessage("Owner Must Be Exist.");
	}

	private async Task<bool> MerchantMustBeExist(int ownerId)
	{
		Merchant? merchant = await _merchantRepository.GetByOwnerIdAsync(ownerId);

		return merchant is not null;
	}
}