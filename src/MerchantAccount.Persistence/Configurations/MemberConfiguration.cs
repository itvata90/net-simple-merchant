using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MerchantAccount.Persistence.Configurations;

public class MemberConfiguration : IEntityTypeConfiguration<Member>
{
	public void Configure(EntityTypeBuilder<Member> builder)
	{
		_ = builder.HasOne(_ => _.Merchant)
			.WithMany()
			.HasForeignKey("MerchantId")
			.OnDelete(DeleteBehavior.NoAction);
	}
}