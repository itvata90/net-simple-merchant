using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Commands.UpdateMember;

public sealed record UpdateMemberCommand(
	int Id,
	string Username,
	string FirstName,
	string LastName) : IRequest<MemberDto>;