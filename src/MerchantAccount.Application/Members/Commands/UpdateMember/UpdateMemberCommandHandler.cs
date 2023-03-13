using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Models;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Members.Commands.UpdateMember;

public class UpdateMemberCommandHandler : IRequestHandler<UpdateMemberCommand, MemberDto>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;
	private readonly IMapper _mapper;

	public UpdateMemberCommandHandler(IApplicationDbContext applicationDbContext, IMemberRepository memberRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;
		_mapper = mapper;
	}

	public async Task<MemberDto> Handle(UpdateMemberCommand request, CancellationToken cancellationToken)
	{
		int id = request.Id;
		Member? entity = await _memberRepository.GetByIdAsync(id);

		if (entity == null)
		{
			throw new NotFoundException("Member", id);
		}

		entity.Username = request.Username;
		entity.FirstName = request.FirstName;
		entity.LastName = request.LastName;

		_ = await _applicationDbContext.SaveChangesAsync(cancellationToken);

		return _mapper.Map<MemberDto>(entity);
	}
}