using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.MemberDetails.Models;
using MerchantAccount.Domain.Entities;
using MediatR;
namespace MerchantAccount.Application.MemberDetails.Queries.GetMemberDetailByMemberId;

public class GetMemberDetailByMemberIdQueryHandler : IRequestHandler<GetMemberDetailByMemberIdQuery, MemberDetailDto>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberDetailRepository _memberDetailRepository;
	private readonly IMapper _mapper;

	public GetMemberDetailByMemberIdQueryHandler(IApplicationDbContext applicationDbContext, IMemberDetailRepository memberDetailRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberDetailRepository = memberDetailRepository;
		_mapper = mapper;
	}

	public async Task<MemberDetailDto> Handle(GetMemberDetailByMemberIdQuery request, CancellationToken cancellationToken)
	{
		MemberDetail? memberDetail = await _memberDetailRepository.GetByMemberIdAsync(request.MemberId);

		return memberDetail == null
			? throw new NotFoundException("MemberDetail", request.MemberId)
			: _mapper.Map<MemberDetailDto>(memberDetail);
	}
}