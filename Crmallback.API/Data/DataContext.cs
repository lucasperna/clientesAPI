using Crmallback.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Crmallback.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)  {}

        public DbSet<Cliente> Clientes { get; set; }
    }
}