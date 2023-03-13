using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Merchants.Queries.GetMerchantById;

public sealed class GetMerchantByIdQueryHandler : IRequestHandler<GetMerchantByIdQuery, MerchantDto>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMerchantRepository _merchantRepository;
	private readonly IMapper _mapper;

	public GetMerchantByIdQueryHandler(
		IApplicationDbContext applicationDbContext,
		IMerchantRepository merchantRepository,
		IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_merchantRepository = merchantRepository;
		_mapper = mapper;
	}

	public async Task<MerchantDto> Handle(GetMerchantByIdQuery request, CancellationToken cancellationToken)
	{
		int id = request.Id;

		Merchant? merchant = await _merchantRepository.GetByIdAsync(id);

		return merchant is null ? throw new NotFoundException("Merchant", id) : _mapper.Map<MerchantDto>(merchant);
	}
}