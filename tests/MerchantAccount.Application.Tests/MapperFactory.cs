using AutoMapper;
using MerchantAccount.Application.Common.Mappings;

namespace MerchantAccount.Application.Tests;

public static class MapperFactory
{
	public static IMapper Create()
	{
		MapperConfiguration configurationProvider = new(cfg =>
		{
			cfg.AddProfile<MappingProfile>();
		});

		return configurationProvider.CreateMapper();
	}
}