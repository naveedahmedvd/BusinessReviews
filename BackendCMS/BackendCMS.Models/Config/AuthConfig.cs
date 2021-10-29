using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendCMS.Models.Config
{
    public class AuthConfig
    {
        public string AuthServerURL { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string Scope { get; set; }
        public string RefreshScope { get; set; }
    }
}
