using Microsoft.EntityFrameworkCore;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Persistence.Repositories;

public sealed class MemberRepository : BaseRepository, IMemberRepository
{
	public MemberRepository(IApplicationDbContext context) : base(context)
	{
	}

	public async Task<Member?> GetByIdAsync(int id)
	{
		return await Context.Members.FindAsync(id);
	}

	public Member? GetById(int id)
	{
		return Context.Members.Find(id);
	}

	public async Task<Member?> GetByUsernameAsync(string username)
	{
		return await Context.Members.FirstOrDefaultAsync(_ => _.Username == username);
	}

	public Member? GetByUsername(string username)
	{
		return Context.Members.FirstOrDefault(_ => _.Username == username);
	}

	public async Task<Member?> GetByIdWithDetailAsync(int id)
	{
		return await Context.Members
			.Where(_ => _.Id == id)
			.Include(_ => _.MemberDetail)
			.FirstOrDefaultAsync();
	}

	public async Task<IEnumerable<Member>> GetAllAsync(int pageLimit, int pageOffset)
	{
		return await Context.Members
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public async Task<IEnumerable<Member>> GetAllByMerchantIdAsync(int merchantId, int pageLimit, int pageOffset)
	{
		return await Context.Members
			.Where(_ => _.MerchantId == merchantId)
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public void Add(Member entity)
	{
		Context.Members.Add(entity);
	}

	public void Remove(Member entity)
	{
		Context.Members.Remove(entity);
	}

	public async Task<int> CountAsync()
	{
		return await Context.Members.CountAsync();
	}
}