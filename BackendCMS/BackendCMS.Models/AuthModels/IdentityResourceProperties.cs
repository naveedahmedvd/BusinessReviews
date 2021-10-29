using System;
using System.Collections.Generic;

namespace BackendCMS.Models.AuthModels
{
    public partial class IdentityResourceProperties
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public int IdentityResourceId { get; set; }

        public virtual IdentityResources IdentityResource { get; set; }
    }
}
