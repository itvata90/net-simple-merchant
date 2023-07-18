using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MerchantAccount.Common;

namespace MerchantAccount.Domain.Entities;

public sealed class MemberDetail : Entity, IAuditableEntity
{
	[Key]
	public int Id { get; set; }

	[StringLength(50)]
	public string BirthDate { get; set; }

	[StringLength(50)]
	public string Nationality { get; set; }

	[StringLength(50)]
	public string Province { get; set; }

	[StringLength(50)]
	public string District { get; set; }

	[StringLength(50)]
	public string Street { get; set; }

	[StringLength(50)]
	[EmailAddress]
	public string Email { get; set; }

	[Phone]
	public string Phone { get; set; }

	public int MemberId { get; set; }
	[ForeignKey("MemberId")]
	public Member Member { get; set; }

	public DateTime CreatedOnUtc { get; set; }
	public DateTime ModifiedOnUtc { get; set; }
}