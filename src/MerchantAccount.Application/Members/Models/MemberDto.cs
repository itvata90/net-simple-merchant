using AutoMapper;
using MerchantAccount.Application.Common.Mappings;
using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Application.Members.Models;

public class MemberDto : IMapFrom<Member>
{
	public int Id { get; set; } = default!;

	public string Username { get; set; } = default!;

	public string FirstName { get; set; } = default!;

	public string LastName { get; set; } = default!;

	public void Mapping(Profile profile)
	{
		_ = profile.CreateMap<Member, MemberDto>();
	}
}