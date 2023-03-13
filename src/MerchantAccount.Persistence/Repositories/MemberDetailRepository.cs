using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MerchantAccount.Persistence.Repositories;

public sealed class MemberDetailRepository : IMemberDetailRepository
{
	private readonly ApplicationDbContext _context;

	public MemberDetailRepository(IApplicationDbContext context)
	{
		_context = (ApplicationDbContext)context;
	}

	public async Task<MemberDetail?> GetByIdAsync(int id)
	{
		return await _context.MemberDetails.FindAsync(id);
	}

	public async Task<MemberDetail?> GetByMemberIdAsync(int memberId)
	{
		return await _context.MemberDetails.FirstOrDefaultAsync(_ => _.MemberId == memberId);
	}

	public async Task<IEnumerable<MemberDetail>> GetAllAsync(int pageLimit, int pageOffset)
	{
		return await _context.MemberDetails
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public void Add(MemberDetail entity)
	{
		_context.MemberDetails.Add(entity);
	}

	public void Remove(MemberDetail entity)
	{
		_context.MemberDetails.Remove(entity);
	}
}