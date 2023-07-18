using Xunit;

namespace MerchantAccount.Application.Tests
{
	[CollectionDefinition("QueryTests")]
	public class QueryFixture : ICollectionFixture<TestBaseFixture>
	{
	}
}