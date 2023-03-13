using System.Reflection.Metadata;
using System.Threading.Tasks;
using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.RemoveMember;

public class RemoveMemberCommandHandler : IRequestHandler<RemoveMemberCommand, int>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;
	private readonly IMerchantRepository _merchantRepository;
	private readonly IMapper _mapper;

	public RemoveMemberCommandHandler(IApplicationDbContext applicationDbContext, IMemberRepository memberRepository, IMerchantRepository merchantRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;
		_merchantRepository = merchantRepository;
		_mapper = mapper;
	}

	public async Task<int> Handle(RemoveMemberCommand request, CancellationToken cancellationToken)
	{
		int memberId = request.MemberId;

		Member? member = await _memberRepository.GetByIdAsync(memberId);

		if (member == null)
		{
			throw new NotFoundException("Member", memberId);
		}

		member.MerchantId = null;


		_ = await _applicationDbContext.SaveChangesAsync(cancellationToken);

		return memberId;
	}
}