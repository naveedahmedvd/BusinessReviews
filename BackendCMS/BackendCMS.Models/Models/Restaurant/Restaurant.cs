using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BackendCMS.Models.Models.Restaurant
{

    public class Restaurant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RestaurantId { get; set; }
        [JsonProperty("placeId")]
        public string PlaceId { get; set; }

        [JsonProperty("isActive")]
        public bool IsActive { get; set; }

        [JsonProperty("restaurantName")]
        public string RestaurantName { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("photos")]
        public List<Photo> Photos { get; set; }

        [JsonProperty("latitude")]
        public double Latitude { get; set; }

        [JsonProperty("longitude")]
        public double Longitude { get; set; }

        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("international_phone")]
        public string InternationalPhone { get; set; }

        [JsonProperty("iconUrl")]
        public string IconUrl { get; set; }

        [JsonProperty("iconBackgroundColor")]
        public string IconBackgroundColor { get; set; }

        [JsonProperty("iconMaskUrl")]
        public string IconMaskUrl { get; set; }

        [JsonProperty("priceLevel")]
        public int PriceLevel { get; set; }

        [JsonProperty("rating")]
        public double Rating { get; set; }

        [JsonProperty("reviews")]
        public virtual List<Review> Reviews { get; set; }

        [JsonProperty("types")]
        public string Types { get; set; }

        [JsonProperty("googleUrl")]
        public string GoogleUrl { get; set; }

        [JsonProperty("userRatingsCount")]
        public int UserRatingsCount { get; set; }

        [JsonProperty("utcOffset")]
        public int UtcOffset { get; set; }

        [JsonProperty("website")]
        public string Website { get; set; }

        public int TimingsId { get; set; }
        [JsonProperty("timings")]
        public virtual Timings Timings { get; set; }
    }


}
