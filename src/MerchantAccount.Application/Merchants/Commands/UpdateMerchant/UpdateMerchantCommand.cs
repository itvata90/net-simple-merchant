using MerchantAccount.Application.Merchants.Models;
using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.UpdateMerchant;

public class UpdateMerchantCommand : IRequest<MerchantDto>
{
	public int Id { get; set; }
	public int OwnerId { get; set; }
	public string Name { get; set; }
	public string Province { get; set; }
	public string District { get; set; }
	public string Street { get; set; }
	public string Email { get; set; }
	public string Phone { get; set; }
	public string Status { get; set; }
}

