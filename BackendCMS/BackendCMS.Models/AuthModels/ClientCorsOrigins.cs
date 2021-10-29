using System;
using System.Collections.Generic;

namespace BackendCMS.Models.AuthModels
{
    public partial class ClientCorsOrigins
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public int ClientId { get; set; }

        public virtual Clients Client { get; set; }
    }
}
