using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Queries.GetMembers;

public record GetMembersQuery(
	int PageLimit,
	int PageOffset) : IRequest<IEnumerable<MemberDto>>;