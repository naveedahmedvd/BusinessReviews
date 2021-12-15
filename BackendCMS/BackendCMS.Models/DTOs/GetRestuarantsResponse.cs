using BackendCMS.Models.Models.Restaurant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendCMS.Models.DTOs
{
    public class GetRestuarantsResponse
    {
        public IEnumerable<Restaurant> Restaurants { get; set; }
        public int totalRows;
    }
}
