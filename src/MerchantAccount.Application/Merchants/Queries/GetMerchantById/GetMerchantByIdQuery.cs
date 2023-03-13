using MerchantAccount.Application.Merchants.Models;
using MediatR;

namespace MerchantAccount.Application.Merchants.Queries.GetMerchantById;

public sealed record GetMerchantByIdQuery(
	int Id) : IRequest<MerchantDto>;