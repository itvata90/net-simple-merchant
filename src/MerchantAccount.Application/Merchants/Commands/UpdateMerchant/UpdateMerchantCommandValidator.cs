using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Merchants.Commands.UpdateMerchant;

public class UpdateMerchantCommandValidator : AbstractValidator<UpdateMerchantCommand>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMerchantRepository _merchantRepository;

	public UpdateMerchantCommandValidator(
		IApplicationDbContext applicationDbContext,
		IMerchantRepository merchantRepository)
	{
		_applicationDbContext = applicationDbContext;
		_merchantRepository = merchantRepository;

		// _ = RuleFor(_ => _.OwnerId)
		//  .Must(await MerchantMustBeExist)
		//  .WithMessage("Owner Must Be Exist.");
	}

	private async Task<bool> MerchantMustBeExist(int ownerId)
	{
		Merchant? merchant = await _merchantRepository.GetByOwnerIdAsync(ownerId);

		return merchant is not null;
	}
}