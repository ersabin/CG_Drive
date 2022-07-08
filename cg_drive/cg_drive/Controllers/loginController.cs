using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cg_drive.Models;
using cg_drive.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace cg_drive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public static int userID;
        public static string username;
        private readonly IConfiguration _config;
        private readonly CgdriveContext _cg;
        public LoginController(IConfiguration config, CgdriveContext users)
        {
            _config = config;
            _cg = users;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody]LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(login);
            if (user != null)
            {
                var tokenString = BuildToken();
                response = Ok(new { token = tokenString, id = userID, name = username });
            }
            return response;
        }

        private object BuildToken()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UsersRequest Authenticate(LoginModel login)
        {
            UsersRequest user = null;
            var result = _cg.Users.FirstOrDefault(obj => obj.Username == login.username);
            try
            {
                if (result.Username != null && result.Password == login.password)
                {
                    user = new UsersRequest { Username = result.Username, Password = result.Password };
                    userID = result.UserId;
                    username = result.Username;
                }
            }
            catch (Exception)
            {
                return null;
            }
            return user;
        }
        public class LoginModel
        {
            public string username { get; set; }
            public string password { get; set; }
        }
    }
}
