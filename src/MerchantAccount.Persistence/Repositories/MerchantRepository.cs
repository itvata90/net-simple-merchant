using Microsoft.EntityFrameworkCore;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Persistence.Repositories;

public sealed class MerchantRepository : BaseRepository, IMerchantRepository
{
	public MerchantRepository(IApplicationDbContext context) : base(context)
	{
	}

	public async Task<Merchant?> GetByIdAsync(int id)
	{
		return await Context.Merchants.FindAsync(id);
	}
	public async Task<Merchant?> GetByOwnerIdAsync(int ownerId)
	{
		return await Context.Merchants.FirstOrDefaultAsync(_ => _.OwnerId == ownerId);
	}

	public async Task<IEnumerable<Merchant>> GetAllAsync(int pageLimit, int pageOffset)
	{
		return await Context.Merchants
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public void Add(Merchant entity)
	{
		Context.Merchants.Add(entity);
	}

	public void Remove(Merchant entity)
	{
		Context.Merchants.Remove(entity);
	}
	public async Task<int> CountAsync()
	{
		return await Context.Merchants.CountAsync();
	}
}