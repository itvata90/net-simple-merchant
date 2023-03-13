using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Commands.CreateMember;

public sealed record CreateMemberCommand(
	string Username,
	string FirstName,
	string LastName) : IRequest<MemberDto>;