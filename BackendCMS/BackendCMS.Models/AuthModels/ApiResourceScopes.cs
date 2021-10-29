using System;
using System.Collections.Generic;

namespace BackendCMS.Models.AuthModels
{
    public partial class ApiResourceScopes
    {
        public int Id { get; set; }
        public string Scope { get; set; }
        public int ApiResourceId { get; set; }

        public virtual ApiResources ApiResource { get; set; }
    }
}
