using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Members.Commands.CreateMember;

public class CreateMemberCommandValidator : AbstractValidator<CreateMemberCommand>
{
	private readonly IMemberRepository _memberRepository;

	public CreateMemberCommandValidator(IMemberRepository memberRepository)
	{
		_memberRepository = memberRepository;

		_ = RuleFor(member => member.Username)
			.NotEmpty();

		_ = RuleFor(member => member.Username)
			.Must(UserNameMustEnteredAndUnique)
			.WithMessage("Username is already used.");
	}

	private bool UserNameMustEnteredAndUnique(string username)
	{
		Member? member = _memberRepository.GetByUsername(username);

		return member == null;
	}
}