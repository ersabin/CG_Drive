using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_drive.Models;
using cg_drive.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cg_drive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly CgdriveContext _cg;
        public UsersController(CgdriveContext data)
        {
            _cg = data;
        }
        // GET: Users
        [HttpGet]
        public IActionResult Get()
        {
            var getData = _cg.Users;
            return Ok(getData);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] UsersRequest value)
        {
            Users user = new Users();
            user.Username = value.Username;
            user.Password = value.Password;
            user.CreatedAt = value.CreatedAt;

            _cg.Users.Add(user);
            _cg.SaveChanges();
            return Ok();
        }      
    }
}