using BackendCMS.BLL;
using BackendCMS.Models.DTOs;
using BackendCMS.Models.Models.Restaurant;
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
    public class RestaurantsController : ControllerBase
    {
        private readonly ILogger<ApplicationController> logger;
        private readonly RestaurantService restaurantService;
        public RestaurantsController(ILogger<ApplicationController> logger, RestaurantService restaurantService)
        {
            this.logger = logger;
            this.restaurantService = restaurantService;
        }
        // GET: api/<RestaurantsController>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get([FromQuery] int page, [FromQuery] string name, [FromQuery] int[] priceLevel, [FromQuery] string[] ratings, [FromQuery] string[] timings)
        {
            try
            {
                return Ok(restaurantService.Get(page, name, priceLevel, ratings, timings));
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }
        }

        // GET api/<RestaurantsController>/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult Get(int id)
        {
            try
            {
                return Ok(restaurantService.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }
        }

        // POST api/<RestaurantsController>
        [HttpPost]
        public IActionResult Post([FromBody] Restaurant restaurant)
        {
            try
            {
                return Created(restaurant.PlaceId, restaurantService.Add(restaurant));
            }
            catch(AlreadyExistsException ex)
            {
                return BadRequest("Restautrant already exists");
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }
        }

        // PUT api/<RestaurantsController>/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RestaurantsController>/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public IActionResult Delete(int id)
        {
            try
            {
                restaurantService.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
