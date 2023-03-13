using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Queries.GetMembersByMerchantId;

public class GetMembersByMerchantIdQueryHandler : IRequestHandler<GetMembersByMerchantIdQuery, IEnumerable<MemberDto>>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;
	private readonly IMapper _mapper;

	public GetMembersByMerchantIdQueryHandler(IApplicationDbContext applicationDbContext, IMemberRepository memberRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<MemberDto>> Handle(GetMembersByMerchantIdQuery request, CancellationToken cancellationToken)
	{
		int pageLimit = request.PageLimit;
		int pageOffset = request.PageOffset;
		int merchantId = request.MerchantId;
		IEnumerable<Domain.Entities.Member> listMember = await _memberRepository.GetAllByMerchantIdAsync(merchantId, pageLimit, pageOffset);
		return listMember.Select(member => _mapper.Map<MemberDto>(member));
	}
}