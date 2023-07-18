using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Models;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Members.Queries.GetMemberById;

public class GetMemberByIdQueryHandler : IRequestHandler<GetMemberByIdQuery, MemberDto>
{
	private readonly IMemberRepository _memberRepository;
	private readonly IMapper _mapper;

	public GetMemberByIdQueryHandler(IMemberRepository memberRepository, IMapper mapper)
	{
		_memberRepository = memberRepository;
		_mapper = mapper;
	}

	public async Task<MemberDto> Handle(GetMemberByIdQuery request, CancellationToken cancellationToken)
	{
		Member? entity = await _memberRepository.GetByIdAsync(request.Id);

		return entity == null ? throw new NotFoundException("Member", request.Id) : _mapper.Map<MemberDto>(entity);
	}
}