using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MediatR;

namespace MerchantAccount.Application.Merchants.Queries.GetMerchants;

public class GetMerchantsQueryHandler : IRequestHandler<GetMerchantsQuery, IEnumerable<MerchantDto>>
{
	private readonly IMerchantRepository _merchantRepository;
	private readonly IMapper _mapper;

	public GetMerchantsQueryHandler(
		IMerchantRepository merchantRepository,
		IMapper mapper)
	{
		_merchantRepository = merchantRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<MerchantDto>> Handle(GetMerchantsQuery request, CancellationToken cancellationToken)
	{
		int pageLimit = request.PageLimit;
		int pageOffset = request.PageOffset;
		IEnumerable<Domain.Entities.Merchant> listMerchant = await _merchantRepository.GetAllAsync(pageLimit, pageOffset);
		return listMerchant.Select(merchant => _mapper.Map<MerchantDto>(merchant));
	}
}