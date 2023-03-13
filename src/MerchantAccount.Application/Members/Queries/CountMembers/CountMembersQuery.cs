using MediatR;

namespace MerchantAccount.Application.Members.Queries.CountMembers;
public sealed record CountMembersQuery() : IRequest<int>;