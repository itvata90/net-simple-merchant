using AutoMapper;

namespace MerchantAccount.Application.Tests;

public class MappingFixture
{
	public MappingFixture()
	{
		Mapper = MapperFactory.Create();
	}

	public IMapper Mapper { get; set; }
}