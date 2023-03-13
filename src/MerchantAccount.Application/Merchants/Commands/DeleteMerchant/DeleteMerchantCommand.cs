using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.DeleteMerchant;

public sealed record DeleteMerchantCommand(int Id) : IRequest;