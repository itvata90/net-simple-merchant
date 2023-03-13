using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MerchantAccount.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
		: base(options)
	{
	}

	public DbSet<Member> Members { get; set; }
	public DbSet<MemberDetail> MemberDetails { get; set; }
	public DbSet<Merchant> Merchants { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		_ = modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
	}
}