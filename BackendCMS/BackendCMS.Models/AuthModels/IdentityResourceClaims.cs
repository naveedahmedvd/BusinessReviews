﻿using System;
using System.Collections.Generic;

namespace BackendCMS.Models.AuthModels
{
    public partial class IdentityResourceClaims
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int IdentityResourceId { get; set; }

        public virtual IdentityResources IdentityResource { get; set; }
    }
}
