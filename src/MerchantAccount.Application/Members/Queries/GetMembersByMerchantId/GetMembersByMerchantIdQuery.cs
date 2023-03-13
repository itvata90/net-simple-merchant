using MediatR;
using MerchantAccount.Application.Members.Models;
namespace MerchantAccount.Application.Members.Queries.GetMembersByMerchantId;

public sealed record GetMembersByMerchantIdQuery(int MerchantId, int PageLimit, int PageOffset) : IRequest<IEnumerable<MemberDto>>;
