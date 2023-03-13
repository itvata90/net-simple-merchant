using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Application.Interfaces;

public interface IMerchantRepository
{
	public Task<Merchant?> GetByIdAsync(int id);
	public Task<Merchant?> GetByOwnerIdAsync(int id);
	public Task<IEnumerable<Merchant>> GetAllAsync(int pageLimit, int pageOffset);

	public void Add(Merchant merchant);
	public void Remove(Merchant merchant);
	public Task<int> Count();
}