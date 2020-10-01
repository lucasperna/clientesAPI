using Crmall.Domain;
using Microsoft.EntityFrameworkCore;

namespace Crmall.Repository
{
    public class CrmallContext: DbContext
    {
        public CrmallContext(DbContextOptions<CrmallContext> options) : base(options)  {}

        public DbSet<Cliente> Clientes { get; set; }
    }
}