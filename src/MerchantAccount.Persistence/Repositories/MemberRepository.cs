using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MerchantAccount.Persistence.Repositories;

public sealed class MemberRepository : IMemberRepository
{
	private readonly ApplicationDbContext _context;

	public MemberRepository(IApplicationDbContext context)
	{
		_context = (ApplicationDbContext)context;
	}

	public async Task<Member?> GetByIdAsync(int id)
	{
		return await _context.Members.FindAsync(id);
	}
	public Member? GetById(int id)
	{
		return _context.Members.Find(id);
	}
	public async Task<Member?> GetByUsernameAsync(string username)
	{
		return await _context.Members.FirstOrDefaultAsync(_ => _.Username == username);
	}

	public Member? GetByUsername(string username)
	{
		return _context.Members.FirstOrDefault(_ => _.Username == username);
	}
	public async Task<Member?> GetByIdWithDetailAsync(int id)
	{
		return await _context.Members
			.Where(_ => _.Id == id)
			.Include(_ => _.MemberDetail)
			.FirstOrDefaultAsync();
	}
	public async Task<IEnumerable<Member>> GetAllAsync(int pageLimit, int pageOffset)
	{
		return await _context.Members
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public async Task<IEnumerable<Member>> GetAllByMerchantIdAsync(int merchantId, int pageLimit, int pageOffset)
	{
		return await _context.Members
			.Where(_ => _.MerchantId == merchantId)
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public void Add(Member entity)
	{
		_context.Members.Add(entity);
	}
	public void Remove(Member entity)
	{
		_context.Members.Remove(entity);
	}

	public async Task<int> Count()
	{
		return _context.Members.Count();
	}
}