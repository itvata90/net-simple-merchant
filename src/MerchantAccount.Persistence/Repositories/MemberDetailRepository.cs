using Microsoft.EntityFrameworkCore;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Persistence.Repositories;

public sealed class MemberDetailRepository : BaseRepository, IMemberDetailRepository
{
	public MemberDetailRepository(IApplicationDbContext context) : base(context)
	{
	}
	public async Task<MemberDetail?> GetByIdAsync(int id)
	{
		return await Context.MemberDetails.FindAsync(id);
	}

	public async Task<MemberDetail?> GetByMemberIdAsync(int memberId)
	{
		return await Context.MemberDetails.FirstOrDefaultAsync(_ => _.MemberId == memberId);
	}

	public async Task<IEnumerable<MemberDetail>> GetAllAsync(int pageLimit, int pageOffset)
	{
		return await Context.MemberDetails
			.OrderBy(_ => _.Id)
			.Skip(pageOffset)
			.Take(pageLimit == 0 ? 5 : pageLimit)
			.ToListAsync();
	}

	public void Add(MemberDetail entity)
	{
		Context.MemberDetails.Add(entity);
	}

	public void Remove(MemberDetail entity)
	{
		Context.MemberDetails.Remove(entity);
	}
}