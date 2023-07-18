using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Commands.UpdateMember;

public class UpdateMemberCommand : IRequest<MemberDto>
{
	public int Id { get; set; }
	public string Username { get; set; }
	public string FirstName { get; set; }
	public string LastName { get; set; }
}