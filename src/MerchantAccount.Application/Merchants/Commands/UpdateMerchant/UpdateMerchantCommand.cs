using MerchantAccount.Application.Merchants.Models;
using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.UpdateMerchant;

public sealed record UpdateMerchantCommand(
	int Id,
	int OwnerId,
	string Name,
	string Province,
	string District,
	string Street,
	string Email,
	string Phone,
	string Status) : IRequest<MerchantDto>;