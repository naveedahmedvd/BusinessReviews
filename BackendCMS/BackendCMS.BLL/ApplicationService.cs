using BackendCMS.DAL;
using BackendCMS.DAL.Models;
using BackendCMS.DAL.Repository;
using BackendCMS.Models.AuthModels;
using BackendCMS.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendCMS.BLL
{
    public class ApplicationService
    {
        private readonly CmsContext context;
        private readonly IRepository<Application> applicationRepository;
        private readonly IRepository<AspNetUsers> userRepository;

        public ApplicationService(
            CmsContext context,
            IRepository<Application> applicationRepository,
            IRepository<AspNetUsers> userRepository)
        {
            this.context = context;
            this.applicationRepository = applicationRepository;
            this.userRepository = userRepository;
        }
        public bool SeedDatabase()
        {
            context.Database.EnsureCreated();
            return true;
        }
        public IEnumerable<Application> GetAll()
        {
            return applicationRepository.GetAll();
        }
        public bool Add(Application application)
        {
            applicationRepository.Insert(application);
            applicationRepository.Save();
            return true;
        }

        public SetupStatusModel SetupStatus()
        {
            string applicationName = applicationRepository.GetAllQueryable().FirstOrDefault()?.Name;
            int userCount = userRepository.GetAllQueryable().Count();
            return new SetupStatusModel() { Application = applicationName, User = userCount > 0 };
        }
    }
}
