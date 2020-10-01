using System.Linq;
using System.Threading.Tasks;
using Crmall.Domain;
using Microsoft.EntityFrameworkCore;

namespace Crmall.Repository
{
    public class CrmallRepository : ICrmallRepository
    {
        public CrmallContext _context { get; }

        public CrmallRepository(CrmallContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Cliente[]> GetAllClinteAsync()
        {
            IQueryable<Cliente> query = _context.Clientes.OrderBy(c => c.Nome);
            query = query.AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<Cliente> GetClinteByIdAsync(int id)
        {
            IQueryable<Cliente> query = _context.Clientes.OrderBy(c => c.Nome).AsNoTracking()
            .Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Cliente[]> GetAllClinteByNomeAsync(string nome)
        {
            IQueryable<Cliente> query = _context.Clientes.OrderBy(c => c.Nome).AsNoTracking()
            .Where(c => c.Nome.ToLower().Contains(nome.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}