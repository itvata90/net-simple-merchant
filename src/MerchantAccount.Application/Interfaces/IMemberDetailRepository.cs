using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Application.Interfaces;

public interface IMemberDetailRepository : IBaseRepository
{
	public Task<MemberDetail?> GetByIdAsync(int id);
	public Task<MemberDetail?> GetByMemberIdAsync(int id);
	public Task<IEnumerable<MemberDetail>> GetAllAsync(int pageLimit, int pageOffset);

	public void Add(MemberDetail memberDetail);
	public void Remove(MemberDetail memberDetail);
}