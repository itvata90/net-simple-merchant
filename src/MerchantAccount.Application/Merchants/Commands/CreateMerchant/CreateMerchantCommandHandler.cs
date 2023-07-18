using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Domain.Entities;
using MediatR;
namespace MerchantAccount.Application.Merchants.Commands.CreateMerchant;

public class CreateMerchantCommandHandler : IRequestHandler<CreateMerchantCommand, MerchantDto>
{
	private readonly IMerchantRepository _merchantRepository;
	private readonly IMapper _mapper;

	public CreateMerchantCommandHandler(IMerchantRepository merchantRepository, IMapper mapper)
	{
		_merchantRepository = merchantRepository;
		_mapper = mapper;
	}

	public async Task<MerchantDto> Handle(CreateMerchantCommand request, CancellationToken cancellationToken)
	{
		Merchant merchant = new()
		{
			Name = request.Name,
			Province = request.Province,
			District = request.District,
			Street = request.Street,
			Email = request.Email,
			Phone = request.Phone,
			Status = request.Status,
			OwnerId = request.OwnerId,
		};

		_merchantRepository.Add(merchant);
		_ = await _merchantRepository.SaveChangesAsync(cancellationToken);

		return _mapper.Map<MerchantDto>(merchant);
	}
}