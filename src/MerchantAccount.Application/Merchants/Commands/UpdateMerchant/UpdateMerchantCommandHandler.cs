using AutoMapper;
using MerchantAccount.Application.Common.Exceptions;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Merchants.Models;
using MerchantAccount.Domain.Entities;
using MediatR;
namespace MerchantAccount.Application.Merchants.Commands.UpdateMerchant;

public class UpdateMerchantCommandHandler : IRequestHandler<UpdateMerchantCommand, MerchantDto>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMerchantRepository _merchantRepository;
	private readonly IMapper _mapper;

	public UpdateMerchantCommandHandler(IApplicationDbContext applicationDbContext, IMerchantRepository merchantRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_merchantRepository = merchantRepository;
		_mapper = mapper;
	}

	public async Task<MerchantDto> Handle(UpdateMerchantCommand request, CancellationToken cancellationToken)
	{
		int id = request.Id;
		Merchant? entity = await _merchantRepository.GetByIdAsync(id);

		if (entity == null)
		{
			throw new NotFoundException("Merchant", id);
		}

		entity.Name = request.Name;
		entity.Province = request.Province;
		entity.District = request.District;
		entity.Street = request.Street;
		entity.Email = request.Email;
		entity.Phone = request.Phone;
		entity.Status = request.Status;
		entity.OwnerId = request.OwnerId;

		_ = await _applicationDbContext.SaveChangesAsync(cancellationToken);

		return _mapper.Map<MerchantDto>(entity);
	}
}