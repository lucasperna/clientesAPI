using AutoMapper;
using Crmall.Domain;
using Crmallback.API.Dtos;

namespace Crmallback.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Cliente, ClienteDto>().ReverseMap();
        }
    }
}