using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Application.Interfaces;

public interface IBaseRepository
{
	Task<int> SaveChangesAsync(CancellationToken token);
}