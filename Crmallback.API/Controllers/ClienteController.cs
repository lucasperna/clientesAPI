using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Crmall.Domain;
using Crmall.Repository;
using Crmallback.API.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crmallback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        public ICrmallRepository _repo { get; }
        public IMapper _mapper { get; }

        public ClienteController(ICrmallRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var clientes = await _repo.GetAllClinteAsync();
                var results = _mapper.Map<ClienteDto[]>(clientes);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                $"Falha no Banco de Dados. {ex.Message}");
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var cliente = await _repo.GetClinteByIdAsync(id);
                var results = _mapper.Map<ClienteDto>(cliente);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no Banco de Dados.");
            }
        }

        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                var clientes = await _repo.GetAllClinteByNomeAsync(nome);
                var results = _mapper.Map<ClienteDto[]>(clientes);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no Banco de Dados.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ClienteDto model)
        {
            try
            {
                var cliente = _mapper.Map<Cliente>(model);
                _repo.Add(cliente);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/cliente/{model.Id}", _mapper.Map<ClienteDto>(cliente));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no Banco de Dados.");
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ClienteDto model)
        {
            try
            {
                var cliente = await _repo.GetClinteByIdAsync(id);
                if (cliente == null)
                {
                    return NotFound("Cliente não encontrado");
                }
                _mapper.Map(model, cliente);
                _repo.Update(cliente);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/cliente/{model.Id}", _mapper.Map<ClienteDto>(cliente));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no Banco de Dados.");
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var cliente = await _repo.GetClinteByIdAsync(id);
                if (cliente == null)
                {
                    return NotFound("Cliente não encontrado");
                }

                _repo.Delete(cliente);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no Banco de Dados.");
            }
            return BadRequest();
        }
    }
}