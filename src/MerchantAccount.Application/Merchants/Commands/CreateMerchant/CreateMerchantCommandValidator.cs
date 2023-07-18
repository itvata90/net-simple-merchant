using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Merchants.Commands.CreateMerchant;

public class CreateMerchantCommandValidator : AbstractValidator<CreateMerchantCommand>
{
	private readonly IMemberRepository _memberRepository;
	private readonly IMerchantRepository _merchantRepository;

	public CreateMerchantCommandValidator(
		IMemberRepository memberRepository,
		IMerchantRepository merchantRepository)
	{
		_memberRepository = memberRepository;
		_merchantRepository = merchantRepository;

		_ = RuleFor(_ => _.OwnerId)
			.MustAsync((x, CancellationToken) => OwnerMustBeExist(x))
			.WithMessage("Owner Must Be Exist.");

		_ = RuleFor(_ => _.OwnerId)
			.MustAsync((x, CancellationToken) => OwnerMustNotHasAlreadyMerchant(x))
			.WithMessage("Owner Must Not Has Any Already Merchant.");
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