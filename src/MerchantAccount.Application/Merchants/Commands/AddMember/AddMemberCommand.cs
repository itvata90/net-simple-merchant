using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.AddMember;

public sealed record AddMemberCommand(int MerchantId, int MemberId) : IRequest<int>;