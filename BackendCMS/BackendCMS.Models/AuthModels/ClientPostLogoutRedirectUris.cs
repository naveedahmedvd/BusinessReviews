using System;
using System.Collections.Generic;

namespace BackendCMS.Models.AuthModels
{
    public partial class ClientPostLogoutRedirectUris
    {
        public int Id { get; set; }
        public string PostLogoutRedirectUri { get; set; }
        public int ClientId { get; set; }

        public virtual Clients Client { get; set; }
    }
}
