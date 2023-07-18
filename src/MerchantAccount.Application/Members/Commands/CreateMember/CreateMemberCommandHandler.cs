using AutoMapper;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Application.Members.Models;
using MerchantAccount.Domain.Entities;
using MediatR;

namespace MerchantAccount.Application.Members.Commands.CreateMember;

public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, MemberDto>
{
	private readonly IMemberRepository _memberRepository;
	private readonly IMapper _mapper;

	public CreateMemberCommandHandler(IMemberRepository memberRepository, IMapper mapper)
	{
		_memberRepository = memberRepository;
		_mapper = mapper;
	}

	public async Task<MemberDto> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
	{
		Member entity = new()
		{
			Username = request.Username,
			FirstName = request.FirstName,
			LastName = request.LastName,
		};

		_memberRepository.Add(entity);

		await _memberRepository.SaveChangesAsync(cancellationToken);

		return _mapper.Map<MemberDto>(entity);
	}
}