using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Commands.CreateMember;

public class CreateMemberCommand : IRequest<MemberDto>
{
	public string Username { get; set; }
	public string FirstName { get; set; }
	public string LastName { get; set; }
}