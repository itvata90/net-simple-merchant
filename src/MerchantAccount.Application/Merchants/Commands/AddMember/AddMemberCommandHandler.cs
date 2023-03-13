using System.Reflection.Metadata;
using System.Threading.Tasks;
using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Merchants.Commands.AddMember;

public class AddMemberCommandHandler : IRequestHandler<AddMemberCommand, int>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberRepository _memberRepository;
	private readonly IMerchantRepository _merchantRepository;
	private readonly IMapper _mapper;

	public AddMemberCommandHandler(IApplicationDbContext applicationDbContext, IMemberRepository memberRepository, IMerchantRepository merchantRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberRepository = memberRepository;
		_merchantRepository = merchantRepository;
		_mapper = mapper;
	}

	public async Task<int> Handle(AddMemberCommand request, CancellationToken cancellationToken)
	{
		int memberId = request.MemberId;
		int merchantId = request.MerchantId;

		Member? member = await _memberRepository.GetByIdAsync(memberId);

		if (member == null)
		{
			throw new NotFoundException("Member", memberId);
		}

		Merchant? merchant = await _merchantRepository.GetByIdAsync(merchantId);

		if (merchant == null)
		{
			throw new NotFoundException("Merchant", merchantId);
		}

		member.MerchantId = merchantId;


		_ = await _applicationDbContext.SaveChangesAsync(cancellationToken);

		return memberId;
	}
}