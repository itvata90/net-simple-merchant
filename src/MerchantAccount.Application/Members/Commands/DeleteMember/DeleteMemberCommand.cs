using MediatR;

namespace MerchantAccount.Application.Members.Commands.DeleteMember;

public sealed record DeleteMemberCommand(int Id) : IRequest;