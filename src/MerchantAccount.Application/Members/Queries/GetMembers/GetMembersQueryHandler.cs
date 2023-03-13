using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Models;
using MediatR;

namespace MerchantAccount.Application.Members.Queries.GetMembers;

public class GetMembersQueryHandler : IRequestHandler<GetMembersQuery, IEnumerable<MemberDto>>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;
	private readonly IMapper _mapper;

	public GetMembersQueryHandler(IApplicationDbContext applicationDbContext, IMemberRepository memberRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<MemberDto>> Handle(GetMembersQuery request, CancellationToken cancellationToken)
	{
		int pageLimit = request.PageLimit;
		int pageOffset = request.PageOffset;
		IEnumerable<Domain.Entities.Member> listMember = await _memberRepository.GetAllAsync(pageLimit, pageOffset);
		return listMember.Select(member => _mapper.Map<MemberDto>(member));
	}
}