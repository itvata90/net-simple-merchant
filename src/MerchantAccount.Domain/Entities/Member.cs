using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MerchantAccount.Common;

namespace MerchantAccount.Domain.Entities;

public sealed class Member : Entity, IAuditableEntity
{
	[Key]
	public int Id { get; set; }

	[StringLength(50)]
	public string Username { get; set; }

	[StringLength(50)]
	public string FirstName { get; set; }

	[StringLength(50)]
	public string LastName { get; set; }

	[ForeignKey("MerchantId")]
	public int? MerchantId { get; set; }
	public Merchant? Merchant { get; set; }

	public MemberDetail MemberDetail { get; set; }

	public DateTime CreatedOnUtc { get; set; }
	public DateTime ModifiedOnUtc { get; set; }
}