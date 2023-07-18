using Microsoft.AspNetCore.Mvc;
using MediatR;
using MerchantAccount.Application.Merchants.Queries.GetMerchants;
using MerchantAccount.Application.Merchants.Queries.GetMerchantById;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Application.Merchants.Commands.CreateMerchant;
using MerchantAccount.Application.Merchants.Commands.DeleteMerchant;
using MerchantAccount.Application.Merchants.Commands.UpdateMerchant;
using MerchantAccount.Application.Members.Queries.GetMembersByMerchantId;
using MerchantAccount.Application.Merchants.Commands.AddMember;
using MerchantAccount.Application.Merchants.Commands.RemoveMember;
using NSwag.Annotations;

namespace MerchantAccount.Web.Controllers;

[Route("[controller]")]
public class MerchantsController : ControllerBase
{
	private readonly IMediator _mediator;
	public MerchantsController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	// this name can be used when we use nswag to generate code client
	[OpenApiOperation("GetMerchants_NameForClientCall")]
	public async Task<ActionResult<IEnumerable<MerchantDto>>> GetMerchants(int limit, int offset)
	{
		return Ok(await _mediator.Send(new GetMerchantsQuery(limit, offset)));
	}

	[HttpGet("{id:int}")]
	[OpenApiOperation("GetMerchant_NameForClientCall")]
	public async Task<ActionResult<MerchantDto>> GetMerchant(int id)
	{
		return Ok(await _mediator.Send(new GetMerchantByIdQuery(id)));
	}

	[HttpPut("{id:int}")]
	public async Task<ActionResult<MerchantDto>> UpdateMerchant(int id, [FromBody] UpdateMerchantCommand command)
	{
		command.Id = id;
		return Ok(await _mediator.Send(command));
	}

	[HttpPost]
	public async Task<ActionResult<MerchantDto>> PostMerchant([FromBody] CreateMerchantCommand command)
	{
		return Ok(await _mediator.Send(command));
	}

	[HttpDelete("{id:int}")]
	public async Task<ActionResult> DeleteMerchant(int id)
	{
		return Ok(await _mediator.Send(new DeleteMerchantCommand(id)));
	}

	[HttpGet("{id:int}/members")]
	public async Task<ActionResult> GetMembers(int id, int limit, int offset)
	{
		return Ok(await _mediator.Send(new GetMembersByMerchantIdQuery(id, limit, offset)));
	}

	[HttpPost("{id:int}/members")]
	public async Task<ActionResult> AddMember(int id, int memberId)
	{
		return Ok(await _mediator.Send(new AddMemberCommand(id, memberId)));
	}

	[HttpDelete("{id:int}/members/{memberId:int}")]
	public async Task<ActionResult> RemoveMember(int id, int memberId)
	{
		return Ok(await _mediator.Send(new RemoveMemberCommand(id, memberId)));
	}
}