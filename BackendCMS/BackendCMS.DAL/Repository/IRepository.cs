﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendCMS.DAL.Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(object id);
        T Insert(T obj);
        void Update(T obj);
        void Delete(object id);
        void Save();
        IQueryable<T> GetAllQueryable();
    }
}
