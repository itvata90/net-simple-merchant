using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Members.Commands.DeleteMember;

public class DeleteMemberCommandHandler : IRequestHandler<DeleteMemberCommand>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;

	private readonly IMapper _mapper;

	public DeleteMemberCommandHandler(
		IApplicationDbContext applicationDbContext,
		IMemberRepository memberRepository,
		IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;
		_mapper = mapper;
	}

	public async Task<Unit> Handle(
		DeleteMemberCommand request,
		CancellationToken cancellationToken)
	{
		int id = request.Id;
		Member? entity = await _memberRepository.GetByIdAsync(id);

		if (entity == null)
		{
			throw new NotFoundException("Member", id);
		}

		_memberRepository.Remove(entity);
		_ = await _applicationDbContext.SaveChangesAsync(cancellationToken);
		return Unit.Value;
	}
}