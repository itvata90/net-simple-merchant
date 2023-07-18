using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Members.Commands.UpdateMember;

public class UpdateMemberCommandValidator : AbstractValidator<UpdateMemberCommand>
{
	private readonly IMemberRepository _memberRepository;

	public UpdateMemberCommandValidator(IMemberRepository memberRepository)
	{
		_memberRepository = memberRepository;

		_ = RuleFor(member => member.Username)
		 .NotEmpty();

		_ = RuleFor(member => new { member.Id, member.Username })
		 .Must(_ => UserNameMustEnteredAndNotUsed(_.Id, _.Username))
		 .WithMessage("Username is already used.");

		_ = RuleFor(member => member.Id)
		 .Must(MemberMustExist)
		 .WithMessage("Member is not exist.");
	}

	private bool UserNameMustEnteredAndNotUsed(int id, string username)
	{
		Member? member = _memberRepository.GetByUsername(username);

		return member == null || member.Id == id;
	}

	private bool MemberMustExist(int id)
	{
		Member? member = _memberRepository.GetById(id);

		return member != null;
	}
}