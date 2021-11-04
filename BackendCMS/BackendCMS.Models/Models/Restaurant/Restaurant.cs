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
        [JsonPropertyName("placeId")]
        public string PlaceId { get; set; }

        [JsonPropertyName("isActive")]
        public bool IsActive { get; set; }

        [JsonPropertyName("restaurantName")]
        public string RestaurantName { get; set; }

        [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("photos")]
        public List<Photo> Photos { get; set; }

        [JsonPropertyName("latitude")]
        public double Latitude { get; set; }

        [JsonPropertyName("longitude")]
        public double Longitude { get; set; }

        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        [JsonPropertyName("international_phone")]
        public string InternationalPhone { get; set; }

        [JsonPropertyName("iconUrl")]
        public string IconUrl { get; set; }

        [JsonPropertyName("iconBackgroundColor")]
        public string IconBackgroundColor { get; set; }

        [JsonPropertyName("iconMaskUrl")]
        public string IconMaskUrl { get; set; }

        [JsonPropertyName("priceLevel")]
        public int PriceLevel { get; set; }

        [JsonPropertyName("rating")]
        public double Rating { get; set; }

        [JsonPropertyName("reviews")]
        public List<Review> Reviews { get; set; }

        [JsonPropertyName("types")]
        public string Types { get; set; }

        [JsonPropertyName("googleUrl")]
        public string GoogleUrl { get; set; }

        [JsonPropertyName("userRatingsCount")]
        public int UserRatingsCount { get; set; }

        [JsonPropertyName("utcOffset")]
        public int UtcOffset { get; set; }

        [JsonPropertyName("website")]
        public string Website { get; set; }

        public int TimingsId { get; set; }
        [JsonPropertyName("timings")]
        public virtual Timings Timings { get; set; }
    }


}
