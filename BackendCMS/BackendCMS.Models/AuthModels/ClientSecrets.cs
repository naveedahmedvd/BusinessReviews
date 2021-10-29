﻿using System;
using System.Collections.Generic;

namespace BackendCMS.Models.AuthModels
{
    public partial class ClientSecrets
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }
        public DateTime? Expiration { get; set; }
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public int ClientId { get; set; }

        public virtual Clients Client { get; set; }
    }
}
