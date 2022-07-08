using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cg_drive.RequestModel
{
    public class UsersRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
