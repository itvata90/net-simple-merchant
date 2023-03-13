// using AutoMapper;
// using DotnetReactCA.Application.Common.Mappings;
// using DotnetReactCA.Domain.Entities;

// namespace DotnetReactCA.Application.Members.Models;

// public class MemberWithDetailDto : IMapFrom<Member>
// {
//  public int Id { get; set; }
//  public string Username { get; set; }
//  public string FirstName { get; set; }
//  public string LastName { get; set; }
//  public string BirthDay { get; set; }
//  public string Nationality { get; set; }
//  public string Province { get; set; }
//  public string District { get; set; }
//  public string Street { get; set; }
//  public string Email { get; set; }
//  public string Phone { get; set; }

// public void Mapping(Profile profile)
//  {
//    _ = profile.CreateMap<Member, MemberDto>().IncludeMembers(s => s.MemberDetail);
//  }
// }`