using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using FluentValidation;

namespace MerchantAccount.Application.Members.Commands.UpdateMember;

public class UpdateMemberCommandValidator : AbstractValidator<UpdateMemberCommand>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;

	public UpdateMemberCommandValidator(IApplicationDbContext applicationDbContext, IMemberRepository memberRepository)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;

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

		return !string.IsNullOrEmpty(username) && (member == null || member.Id == id);
	}

	private bool MemberMustExist(int id)
	{
		Member? member = _memberRepository.GetById(id);

		return member != null;
	}
}