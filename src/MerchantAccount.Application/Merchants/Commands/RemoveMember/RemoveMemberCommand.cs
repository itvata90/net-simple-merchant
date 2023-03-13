using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.RemoveMember;

public sealed record RemoveMemberCommand(int MerchantId, int MemberId) : IRequest<int>;