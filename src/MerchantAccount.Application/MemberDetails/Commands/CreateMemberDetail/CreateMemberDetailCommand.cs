using MerchantAccount.Application.MemberDetails.Models;
using MediatR;
namespace MerchantAccount.Application.MemberDetails.Commands.CreateMemberDetail;

public sealed record CreateMemberDetailCommand(
	int MemberId,
	string BirthDate,
	string Nationality,
	string Province,
	string District,
	string Street,
	string Email,
	string Phone) : IRequest<MemberDetailDto>;