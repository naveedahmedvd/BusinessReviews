using BackendCMS.BLL;
using BackendCMS.Models.AuthViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService accountService;

        public AccountController(AccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost]
        [Route("[action]")]
        [AllowAnonymous]
        public IActionResult CreateUser([FromBody] RegisterViewModel registerViewModel)
        {
            try
            {
                var count = accountService.UserCount();
                if (!User.Identity.IsAuthenticated && count > 0)
                    return BadRequest();
                if (count == 0)
                    registerViewModel.IsAdmin = true;
                return Ok(accountService.CreateUser(registerViewModel));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("[action]")]
        [AllowAnonymous]
        public IActionResult Token([FromBody] LoginViewModel model)
        {
            try
            {
                TokenModel token;
                if (string.IsNullOrEmpty(model.refreshToken))
                    token = accountService.GetToken(model.username, model.password);
                else
                    token = accountService.GetToken(model.refreshToken);
                if (token.AccessToken != null)
                    Response.Cookies.Append("accessToken", token.AccessToken, new CookieOptions
                    {
                        HttpOnly = true,
                        Expires = DateTime.UtcNow.AddDays(7),
                    });
                return Ok(token);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }
    }
}
