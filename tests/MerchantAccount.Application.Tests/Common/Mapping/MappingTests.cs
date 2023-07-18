using AutoMapper;
using Xunit;

namespace MerchantAccount.Application.Tests.Common.Mapping;

public class MappingTests : IClassFixture<MappingFixture>
{
	private readonly IMapper _mapper;

	public MappingTests(MappingFixture fixture)
	{
		_mapper = fixture.Mapper;
	}

	[Fact]
	public void ShouldHaveValidConfiguration()
	{
		_mapper
			.ConfigurationProvider
			.AssertConfigurationIsValid();
	}
}