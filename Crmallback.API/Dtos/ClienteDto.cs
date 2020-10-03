using System;
using System.ComponentModel.DataAnnotations;

namespace Crmallback.API.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage="Campo nome é obrigatório.")]
        public string Nome { get; set; }

        [Required (ErrorMessage="Campo data de nascimento é obrigatório.")]
        public DateTime DataNascimento { get; set; }
        public string Sexo { get; set; }
        public string CEP { get; set; }
        public string Endereco { get; set; }
        public int Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
    }
}