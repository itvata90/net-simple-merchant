using System;
namespace MerchantAccount.Common;

public interface IAuditableEntity
{
	public DateTime CreatedOnUtc { get; set; }
	public DateTime ModifiedOnUtc { get; set; }
}