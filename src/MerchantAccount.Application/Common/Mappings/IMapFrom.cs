using AutoMapper;

namespace MerchantAccount.Application.Common.Mappings;

public interface IMapFrom<T>
{
	void Mapping(Profile profile)
	{
		_ = profile.CreateMap(typeof(T), GetType());
	}
}