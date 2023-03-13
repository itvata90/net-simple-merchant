using AutoMapper;
using MerchantAccount.Application.Common.Mappings;
using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Application.Merchants.Models;

public class MerchantDto : IMapFrom<Merchant>
{
	public int Id { get; set; } = default!;
	public int OwnerId { get; set; } = default!;
	public string Name { get; set; } = default!;
	public string Province { get; set; } = default!;
	public string District { get; set; } = default!;
	public string Street { get; set; } = default!;
	public string Email { get; set; } = default!;
	public string Phone { get; set; } = default!;
	public string Status { get; set; } = default!;

	public void Mapping(Profile profile)
	{
		_ = profile.CreateMap<Merchant, MerchantDto>();
	}
}