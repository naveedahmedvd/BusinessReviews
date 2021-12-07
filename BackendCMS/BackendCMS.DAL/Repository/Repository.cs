using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendCMS.DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private CmsContext _context = null;
        private DbSet<T> table = null;
        public Repository(CmsContext context)
        {
            this._context = context;
            table = _context.Set<T>();
        }

        public IEnumerable<T> GetAll(string includes = "")
        {
            var query = table.AsQueryable();
            if (!string.IsNullOrEmpty(includes))
            {
                var includesList = includes.Split(",");
                foreach (var include in includesList)
                    query = query.Include(include.Trim());
            }
            return query.ToList();
        }
        public IQueryable<T> GetAllQueryable(string includes = "")
        {
            var query = table.AsQueryable();
            if (!string.IsNullOrEmpty(includes))
            {
                var includesList = includes.Split(",");
                foreach (var include in includesList)
                    query = query.Include(include.Trim());
            }
            return query;
        }
        public T GetById(object id)
        {
            return table.Find(id);
        }
        public T Insert(T obj)
        {
            return table.Add(obj).Entity;

        }
        public void Update(T obj)
        {
            table.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
        }
        public void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
        }
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
