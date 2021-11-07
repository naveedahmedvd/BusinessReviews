using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendCMS.Models.Models.Restaurant
{
    public class Timings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TimingsId { get; set; }
        [JsonProperty("mondayOpeningHours")]
        public int MondayOpeningHours { get; set; }

        [JsonProperty("mondayOpeningMinutes")]
        public int MondayOpeningMinutes { get; set; }

        [JsonProperty("mondayClosingHours")]
        public int MondayClosingHours { get; set; }

        [JsonProperty("mondayClosingMinutes")]
        public int MondayClosingMinutes { get; set; }

        [JsonProperty("tuesdayOpeningHours")]
        public int TuesdayOpeningHours { get; set; }

        [JsonProperty("tuesdayOpeningMinutes")]
        public int TuesdayOpeningMinutes { get; set; }

        [JsonProperty("tuesdayClosingHours")]
        public int TuesdayClosingHours { get; set; }

        [JsonProperty("tuesdayClosingMinutes")]
        public int TuesdayClosingMinutes { get; set; }

        [JsonProperty("wednesdayOpeningHours")]
        public int WednesdayOpeningHours { get; set; }

        [JsonProperty("wednesdayOpeningMinutes")]
        public int WednesdayOpeningMinutes { get; set; }

        [JsonProperty("wednesdayClosingHours")]
        public int WednesdayClosingHours { get; set; }

        [JsonProperty("wednesdayClosingMinutes")]
        public int WednesdayClosingMinutes { get; set; }

        [JsonProperty("thursdayOpeningHours")]
        public int ThursdayOpeningHours { get; set; }

        [JsonProperty("thursdayOpeningMinutes")]
        public int ThursdayOpeningMinutes { get; set; }

        [JsonProperty("thursdayClosingHours")]
        public int ThursdayClosingHours { get; set; }

        [JsonProperty("thursdayClosingMinutes")]
        public int ThursdayClosingMinutes { get; set; }

        [JsonProperty("fridayOpeningHours")]
        public int FridayOpeningHours { get; set; }

        [JsonProperty("fridayOpeningMinutes")]
        public int FridayOpeningMinutes { get; set; }

        [JsonProperty("fridayClosingHours")]
        public int FridayClosingHours { get; set; }

        [JsonProperty("fridayClosingMinutes")]
        public int FridayClosingMinutes { get; set; }

        [JsonProperty("saturdayOpeningHours")]
        public int SaturdayOpeningHours { get; set; }

        [JsonProperty("saturdayOpeningMinutes")]
        public int SaturdayOpeningMinutes { get; set; }

        [JsonProperty("saturdayClosingHours")]
        public int SaturdayClosingHours { get; set; }

        [JsonProperty("saturdayClosingMinutes")]
        public int SaturdayClosingMinutes { get; set; }

        [JsonProperty("sundayOpeningHours")]
        public int SundayOpeningHours { get; set; }

        [JsonProperty("sundayOpeningMinutes")]
        public int SundayOpeningMinutes { get; set; }

        [JsonProperty("sundayClosingHours")]
        public int SundayClosingHours { get; set; }

        [JsonProperty("sundayClosingMinutes")]
        public int SundayClosingMinutes { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }


}
