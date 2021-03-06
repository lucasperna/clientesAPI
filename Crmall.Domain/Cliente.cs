using System;
using System.ComponentModel.DataAnnotations;

namespace Crmall.Domain
{
    public class Cliente
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        [Required]
        public string Sexo { get; set; }
        public string CEP { get; set; }
        public string Endereco { get; set; }
        public int? Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
    }
}