using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MerchantAccount.Application.Interfaces;

namespace MerchantAccount.Application.Members.Queries.CountMembers;

public class CountMembersQueryHandler : IRequestHandler<CountMembersQuery, int>
{
	private readonly IMemberRepository _memberRepository;

	public CountMembersQueryHandler(
		IMemberRepository memberRepository)
	{
		_memberRepository = memberRepository;
	}

	public async Task<int> Handle(CountMembersQuery request, CancellationToken cancellationToken)
	{
		return await _memberRepository.Count();
	}
}