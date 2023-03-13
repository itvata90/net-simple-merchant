using MerchantAccount.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MerchantAccount.Persistence.Configurations;

public class MemberDetailConfiguration : IEntityTypeConfiguration<MemberDetail>
{
	public void Configure(EntityTypeBuilder<MemberDetail> builder)
	{
		_ = builder.HasOne(_ => _.Member)
			.WithOne(member => member.MemberDetail)
			.HasForeignKey<MemberDetail>("MemberId")
			.OnDelete(DeleteBehavior.Cascade);
	}
}