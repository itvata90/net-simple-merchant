namespace MerchantAccount.Application.Interfaces;

public interface IApplicationDbContext
{
	Task<int> SaveChangesAsync(CancellationToken token);
}