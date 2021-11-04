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
        [JsonPropertyName("mondayOpeningHours")]
        public int MondayOpeningHours { get; set; }

        [JsonPropertyName("mondayOpeningMinutes")]
        public int MondayOpeningMinutes { get; set; }

        [JsonPropertyName("mondayClosingHours")]
        public int MondayClosingHours { get; set; }

        [JsonPropertyName("mondayClosingMinutes")]
        public int MondayClosingMinutes { get; set; }

        [JsonPropertyName("tuesdayOpeningHours")]
        public int TuesdayOpeningHours { get; set; }

        [JsonPropertyName("tuesdayOpeningMinutes")]
        public int TuesdayOpeningMinutes { get; set; }

        [JsonPropertyName("tuesdayClosingHours")]
        public int TuesdayClosingHours { get; set; }

        [JsonPropertyName("tuesdayClosingMinutes")]
        public int TuesdayClosingMinutes { get; set; }

        [JsonPropertyName("wednesdayOpeningHours")]
        public int WednesdayOpeningHours { get; set; }

        [JsonPropertyName("wednesdayOpeningMinutes")]
        public int WednesdayOpeningMinutes { get; set; }

        [JsonPropertyName("wednesdayClosingHours")]
        public int WednesdayClosingHours { get; set; }

        [JsonPropertyName("wednesdayClosingMinutes")]
        public int WednesdayClosingMinutes { get; set; }

        [JsonPropertyName("thursdayOpeningHours")]
        public int ThursdayOpeningHours { get; set; }

        [JsonPropertyName("thursdayOpeningMinutes")]
        public int ThursdayOpeningMinutes { get; set; }

        [JsonPropertyName("thursdayClosingHours")]
        public int ThursdayClosingHours { get; set; }

        [JsonPropertyName("thursdayClosingMinutes")]
        public int ThursdayClosingMinutes { get; set; }

        [JsonPropertyName("fridayOpeningHours")]
        public int FridayOpeningHours { get; set; }

        [JsonPropertyName("fridayOpeningMinutes")]
        public int FridayOpeningMinutes { get; set; }

        [JsonPropertyName("fridayClosingHours")]
        public int FridayClosingHours { get; set; }

        [JsonPropertyName("fridayClosingMinutes")]
        public int FridayClosingMinutes { get; set; }

        [JsonPropertyName("saturdayOpeningHours")]
        public int SaturdayOpeningHours { get; set; }

        [JsonPropertyName("saturdayOpeningMinutes")]
        public int SaturdayOpeningMinutes { get; set; }

        [JsonPropertyName("saturdayClosingHours")]
        public int SaturdayClosingHours { get; set; }

        [JsonPropertyName("saturdayClosingMinutes")]
        public int SaturdayClosingMinutes { get; set; }

        [JsonPropertyName("sundayOpeningHours")]
        public int SundayOpeningHours { get; set; }

        [JsonPropertyName("sundayOpeningMinutes")]
        public int SundayOpeningMinutes { get; set; }

        [JsonPropertyName("sundayClosingHours")]
        public int SundayClosingHours { get; set; }

        [JsonPropertyName("sundayClosingMinutes")]
        public int SundayClosingMinutes { get; set; }
        public virtual Restaurant Restaurant { get; set; }
    }


}
