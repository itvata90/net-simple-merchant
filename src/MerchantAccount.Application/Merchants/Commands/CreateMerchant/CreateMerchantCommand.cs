using MerchantAccount.Application.Merchants.Models;
using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.CreateMerchant;

public sealed record CreateMerchantCommand(
	int OwnerId,
	string Name,
	string Province,
	string District,
	string Street,
	string Email,
	string Phone,
	string Status) : IRequest<MerchantDto>;