using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Merchants.Commands.CreateMerchant;

public class CreateMerchantCommandValidator : AbstractValidator<CreateMerchantCommand>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;
	private readonly IMerchantRepository _merchantRepository;

	public CreateMerchantCommandValidator(
		IApplicationDbContext applicationDbContext,
		IMemberRepository memberRepository,
		IMerchantRepository merchantRepository)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;
		_merchantRepository = merchantRepository;

		// _ = RuleFor(_ => _.OwnerId)
		//  .Must(await OwnerMustBeExist)
		//  .WithMessage("Owner Must Be Exist.")
		//  .Must(await OwnerMustNotHasAlreadyMerchant)
		//  .WithMessage("Owner Must Not Has Any Already Merchant.");
	}

	private async Task<bool> OwnerMustBeExist(int ownerId)
	{
		Member? member = await _memberRepository.GetByIdAsync(ownerId);

		return member != null;
	}

	private async Task<bool> OwnerMustNotHasAlreadyMerchant(int ownerId)
	{
		Merchant? merchant = await _merchantRepository.GetByOwnerIdAsync(ownerId);

		return merchant is null;
	}
}