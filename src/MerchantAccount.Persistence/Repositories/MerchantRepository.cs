using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MerchantAccount.Persistence.Repositories;

public sealed class MerchantRepository : IMerchantRepository
{
	private readonly ApplicationDbContext _context;

	public MerchantRepository(IApplicationDbContext context)
	{
		_context = (ApplicationDbContext)context;
	}

	public async Task<Merchant?> GetByIdAsync(int id)
	{
		return await _context.Merchants.FindAsync(id);
	}
	public async Task<Merchant?> GetByOwnerIdAsync(int ownerId)
	{
		return await _context.Merchants.FirstOrDefaultAsync(_ => _.OwnerId == ownerId);
	}

	public async Task<IEnumerable<Merchant>> GetAllAsync(int pageLimit, int pageOffset)
	{
		return await _context.Merchants
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public void Add(Merchant entity)
	{
		_context.Merchants.Add(entity);
	}

	public void Remove(Merchant entity)
	{
		_context.Merchants.Remove(entity);
	}
	public async Task<int> Count()
	{
		return _context.Merchants.Count();
	}
}