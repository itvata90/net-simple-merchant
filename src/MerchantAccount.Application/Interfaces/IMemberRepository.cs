using MerchantAccount.Domain.Entities;

namespace MerchantAccount.Application.Interfaces;

public interface IMemberRepository
{
	public Task<Member?> GetByIdAsync(int id);
	public Member? GetById(int id);
	public Task<Member?> GetByUsernameAsync(string username);
	public Member? GetByUsername(string username);
	public Task<Member?> GetByIdWithDetailAsync(int id);
	public Task<IEnumerable<Member>> GetAllAsync(int pageLimit, int pageOffset);
	public Task<IEnumerable<Member>> GetAllByMerchantIdAsync(int merchantId, int pageLimit, int pageOffset);

	public void Add(Member member);
	public void Remove(Member member);
	public Task<int> Count();
}