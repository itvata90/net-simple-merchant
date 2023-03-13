using AutoMapper;
using MerchantAccount.Application.Common.Mappings;
using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Application.MemberDetails.Models;

public class MemberDetailDto : IMapFrom<MemberDetail>
{
	public int MemberId { get; set; } = default!;
	public string BirthDay { get; set; } = default!;
	public string Nationality { get; set; } = default!;
	public string Province { get; set; } = default!;
	public string District { get; set; } = default!;
	public string Street { get; set; } = default!;
	public string Email { get; set; } = default!;
	public string Phone { get; set; } = default!;

	public void Mapping(Profile profile)
	{
		_ = profile.CreateMap<MemberDetail, MemberDetailDto>();
	}
}