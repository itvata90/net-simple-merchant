using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.MemberDetails.Models;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.MemberDetails.Commands.CreateMemberDetail;

public class CreateMemberDetailCommandHandler : IRequestHandler<CreateMemberDetailCommand, MemberDetailDto>
{
	private readonly IApplicationDbContext _applicationDbContext;
	private readonly IMemberDetailRepository _memberDetailRepository;
	private readonly IMapper _mapper;

	public CreateMemberDetailCommandHandler(IApplicationDbContext applicationDbContext, IMemberDetailRepository memberDetailRepository, IMapper mapper)
	{
		_applicationDbContext = applicationDbContext;
		_memberDetailRepository = memberDetailRepository;
		_mapper = mapper;
	}

	public async Task<MemberDetailDto> Handle(CreateMemberDetailCommand request, CancellationToken cancellationToken)
	{
		MemberDetail newDetail = new()
		{
			MemberId = request.MemberId,
			BirthDate = request.BirthDate,
			Nationality = request.Nationality,
			Province = request.Province,
			District = request.District,
			Street = request.Street,
			Email = request.Email,
			Phone = request.Phone,
		};
		_memberDetailRepository.Add(newDetail);
		_ = await _applicationDbContext.SaveChangesAsync(cancellationToken);
		return _mapper.Map<MemberDetailDto>(newDetail);
	}
}