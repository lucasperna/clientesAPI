using System.Threading.Tasks;
using Crmall.Domain;

namespace Crmall.Repository
{
    public interface ICrmallRepository
    {
         void Add<T>(T entity) where T: class;
         void Update<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
        Task<bool> SaveChangesAsync();

        //CLIENTE
        Task<Cliente[]> GetAllClinteAsync();
        Task<Cliente[]> GetAllClinteByNomeAsync(string nome);
        Task<Cliente> GetClinteByIdAsync(int id);
    }
}