using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MerchantAccount.Persistence.Configurations;

public class MerchantConfiguration : IEntityTypeConfiguration<Merchant>
{
	public void Configure(EntityTypeBuilder<Merchant> builder)
	{
		_ = builder.HasOne(_ => _.Owner)
			.WithOne(member => member.Merchant)
			.HasForeignKey<Merchant>("OwnerId")
			.OnDelete(DeleteBehavior.Cascade);
	}
}