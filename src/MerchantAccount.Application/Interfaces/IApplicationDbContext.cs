using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace MerchantAccount.Application.Interfaces;

public interface IApplicationDbContext
{
	public DbSet<Member> Members { get; set; }
	public DbSet<MemberDetail> MemberDetails { get; set; }
	public DbSet<Merchant> Merchants { get; set; }
	Task<int> SaveChangesAsync(CancellationToken token);
}