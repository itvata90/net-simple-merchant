using MerchantAccount.Application.MemberDetails.Models;
using MediatR;
namespace MerchantAccount.Application.MemberDetails.Queries.GetMemberDetailByMemberId;

public sealed record GetMemberDetailByMemberIdQuery(int MemberId) : IRequest<MemberDetailDto>;