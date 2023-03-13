using MerchantAccount.Application.Merchants.Models;
using MediatR;

namespace MerchantAccount.Application.Merchants.Queries.GetMerchants;

public sealed record GetMerchantsQuery(
	int PageLimit,
	int PageOffset) : IRequest<IEnumerable<MerchantDto>>;