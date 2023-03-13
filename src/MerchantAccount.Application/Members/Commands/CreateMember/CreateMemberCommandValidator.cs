using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Members.Commands.CreateMember;

public class CreateMemberCommandValidator : AbstractValidator<CreateMemberCommand>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;

	public CreateMemberCommandValidator(
		IApplicationDbContext applicationDbContext,
		IMemberRepository memberRepository)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;

		_ = RuleFor(member => member.Username)
			.Must(UserNameMustEnteredAndUnique)
			.WithMessage("Username is already used.");
	}

	private bool UserNameMustEnteredAndUnique(string username)
	{
		Member? member = _memberRepository.GetByUsername(username);

		return !string.IsNullOrEmpty(username) && member == null;
	}
}