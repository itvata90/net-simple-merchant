using AutoMapper;
using MerchantAccount.Persistence;
using MerchantAccount.Persistence.Repositories;

namespace MerchantAccount.Application.Tests
{
	public class TestBaseFixture : IDisposable
	{
		public TestBaseFixture()
		{
			Context = DbContextFactory.Create();
			Mapper = MapperFactory.Create();
			MemberRepository = new MemberRepository(this.Context);
			MerchantRepository = new MerchantRepository(this.Context);
		}

		public ApplicationDbContext Context { get; }

		public MemberRepository MemberRepository { get; }
		public MerchantRepository MerchantRepository { get; }

		public IMapper Mapper { get; }

		public void Dispose()
		{
			DbContextFactory.Destroy(Context);
		}
	}
}