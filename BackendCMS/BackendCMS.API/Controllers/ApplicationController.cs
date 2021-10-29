using BackendCMS.BLL;
using BackendCMS.DAL.Models;
using BackendCMS.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackendCMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly ILogger<ApplicationController> logger;
        private readonly ApplicationService applicationService;

        public ApplicationController(ILogger<ApplicationController> logger, ApplicationService applicationService)
        {
            this.logger = logger;
            this.applicationService = applicationService;
        }
        // GET: api/<ApplicationController>/<SeedDatabase>
        [HttpGet]
        [Route("[action]")]
        [AllowAnonymous]
        public bool SeedDatabase()
        {
            applicationService.SeedDatabase();
            return true;
        }

        // GET: api/<ApplicationController>
        [HttpGet]
        public IEnumerable<Application> Get()
        {
            return applicationService.GetAll();
        }
        [HttpGet]
        [Route("[action]")]
        [AllowAnonymous]
        public SetupStatusModel SetupStatus()
        {
            return applicationService.SetupStatus();
        }

        // GET api/<ApplicationController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ApplicationController>
        [HttpPost]
        public void Post([FromBody] Application application)
        {
            applicationService.Add(application);
        }

        // PUT api/<ApplicationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ApplicationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
