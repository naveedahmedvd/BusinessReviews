﻿using Microsoft.EntityFrameworkCore;
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
        
        public IEnumerable<T> GetAll()
        {
            return table.ToList();
        }
        public IQueryable<T> GetAllQueryable()
        {
            return table.AsQueryable<T>();
        }
        public T GetById(object id)
        {
            return table.Find(id);
        }
        public void Insert(T obj)
        {
            table.Add(obj);
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
