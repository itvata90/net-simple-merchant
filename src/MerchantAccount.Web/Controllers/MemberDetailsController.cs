using Microsoft.AspNetCore.Mvc;
using MediatR;
using MerchantAccount.Application.MemberDetails.Commands.CreateMemberDetail;
using MerchantAccount.Application.MemberDetails.Models;
using MerchantAccount.Application.MemberDetails.Queries.GetMemberDetailByMemberId;
namespace MerchantAccount.Web.Controllers;

[Route("[controller]")]
public class MemberDetailsController
{
	private readonly IMediator _mediator;

	public MemberDetailsController(IMediator mediator)
	{
		_mediator = mediator;
	}
}