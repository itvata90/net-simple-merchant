
using System.Net.Http.Headers;
using System.Data;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MerchantAccount.Application.Members.Commands.CreateMember;
using MerchantAccount.Application.Members.Commands.UpdateMember;
using MerchantAccount.Application.Members.Commands.DeleteMember;
using MerchantAccount.Application.Members.Models;
using MerchantAccount.Application.Members.Queries.CountMembers;
using MerchantAccount.Application.Members.Queries.GetMemberById;
using MerchantAccount.Application.Members.Queries.GetMembers;
using MerchantAccount.Application.MemberDetails.Commands.CreateMemberDetail;
using MerchantAccount.Application.MemberDetails.Models;
using MerchantAccount.Application.MemberDetails.Queries.GetMemberDetailByMemberId;

namespace MerchantAccount.Web.Controllers;

[Route("[controller]")]
[ApiController]
public class MembersController : ControllerBase
{
	private readonly IMediator _mediator;

	public MembersController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	[ResponseCache(Duration = 600)]
	[ProducesResponseType(StatusCodes.Status200OK)]
	public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers(int limit, int offset)
	{
		var members = await _mediator.Send(new GetMembersQuery(limit, offset));
		int count = await _mediator.Send(new CountMembersQuery());
		HttpContext.Response.Headers.Add("X-Total-Count", count.ToString());
		return Ok(members);
	}


	[HttpGet("{id:int}")]
	public async Task<ActionResult<IEnumerable<MemberDto>>> GetMember(int id)
	{
		return Ok(await _mediator.Send(new GetMemberByIdQuery(id)));
	}

	[HttpGet("{id:int}/detail")]
	public async Task<ActionResult<IEnumerable<MemberDto>>> GetMemberDetail(int id)
	{
		return Ok(await _mediator.Send(new GetMemberDetailByMemberIdQuery(id)));
	}


	[HttpPost]
	public async Task<ActionResult<MemberDto>> PostMember([FromBody] CreateMemberCommand command)
	{
		return Ok(await _mediator.Send(command));
	}

	[HttpPost("{id:int}/detail")]
	public async Task<ActionResult<MemberDetailDto>> GetMemberDetail(int id, [FromBody] CreateMemberDetailCommand command)
	{
		return Ok(await _mediator.Send(new CreateMemberDetailCommand(
			id,
			command.BirthDate,
			command.Nationality,
			command.Province,
			command.District,
			command.Street,
			command.Email,
			command.Phone
		)));
	}

	[HttpPut("{id}")]
	public async Task<ActionResult<MemberDto>> PutMember(int id, [FromBody] UpdateMemberCommand command)
	{
		return Ok(await _mediator.Send(new UpdateMemberCommand(
			id,
			command.Username,
			command.FirstName,
			command.LastName)));
	}

	[HttpDelete("{id}")]
	public async Task<ActionResult> DeleteMember(int id)
	{
		return Ok(await _mediator.Send(new DeleteMemberCommand(id)));
	}
}