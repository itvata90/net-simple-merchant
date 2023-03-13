using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Queries.GetMemberById;

public sealed record GetMemberByIdQuery(int Id) : IRequest<MemberDto>;