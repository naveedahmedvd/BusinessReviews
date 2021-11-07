using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendCMS.Models.Models.Restaurant
{
    // Root myDeserializedClass = JsonSerializer.Deserialize<Root>(myJsonResponse);
    public class Photo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PhotoId { get; set; }
        public int RestaurantId { get; set; }
        [JsonProperty("url")]
        public string Url { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }


}
