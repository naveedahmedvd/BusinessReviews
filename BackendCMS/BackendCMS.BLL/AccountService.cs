using BackendCMS.DAL;
using BackendCMS.DAL.Repository;
using BackendCMS.Models.AuthModels;
using BackendCMS.Models.AuthViewModels;
using BackendCMS.Models.Config;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackendCMS.BLL
{
    public class AccountService
    {
        private readonly CmsContext _ctx;
        private readonly IRepository<AspNetUsers> userRepository;
        private readonly AuthConfig authConfig;

        public AccountService(CmsContext context, IOptions<AuthConfig> authConfig, IRepository<AspNetUsers> userRepository)
        {
            this._ctx = context;
            this.userRepository = userRepository;
            this.authConfig = authConfig.Value;
        }
        public string CreateUser(RegisterViewModel model)
        {
            try
            {
                AspNetUsers user = new AspNetUsers();
                user.UserName = model.Username;
                user.Email = model.Email;
                user.NormalizedEmail = model.Email.ToUpper();
                user.NormalizedUserName = model.Username.ToUpper();
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.IsEnabled = true;
                user.SecurityStamp = Guid.NewGuid().ToString();
                PasswordHasher<AspNetUsers> hasher = new PasswordHasher<AspNetUsers>();
                var hash = hasher.HashPassword(user, model.Password);
                user.PasswordHash = hash;
                user.Id = Guid.NewGuid().ToString();
                _ctx.Add(user);
                _ctx.SaveChanges();

                AspNetUserClaims claim = new AspNetUserClaims();
                claim.UserId = user.Id;
                claim.ClaimType = JwtClaimTypes.Name;
                claim.ClaimValue = model.Username;
                _ctx.Add(claim);

                if (model.IsAdmin)
                {
                    claim = new AspNetUserClaims();
                    claim.UserId = user.Id;
                    claim.ClaimType = JwtClaimTypes.Role;
                    claim.ClaimValue = "admin";
                    _ctx.Add(claim);
                }


                claim = new AspNetUserClaims();
                claim.UserId = user.Id;
                claim.ClaimType = JwtClaimTypes.GivenName;
                claim.ClaimValue = model.FirstName;
                _ctx.Add(claim);

                claim = new AspNetUserClaims();
                claim.UserId = user.Id;
                claim.ClaimType = JwtClaimTypes.FamilyName;
                claim.ClaimValue = model.LastName;
                _ctx.Add(claim);

                claim = new AspNetUserClaims();
                claim.UserId = user.Id;
                claim.ClaimType = JwtClaimTypes.Email;
                claim.ClaimValue = model.Email;
                _ctx.Add(claim);

                claim = new AspNetUserClaims();
                claim.UserId = user.Id;
                claim.ClaimType = JwtClaimTypes.EmailVerified;
                claim.ClaimValue = true.ToString();
                _ctx.Add(claim);

                claim = new AspNetUserClaims();
                claim.UserId = user.Id;
                claim.ClaimType = JwtClaimTypes.Scope;
                claim.ClaimValue = "api1";
                _ctx.Add(claim);

                _ctx.SaveChanges();

                return user.Id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public TokenModel GetToken(string username, string password)
        {
            var client = new RestClient($"{authConfig.AuthServerURL}/connect/token");
            client.Timeout = -1;
            
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddParameter("grant_type", "password");
            request.AddParameter("client_id", authConfig.ClientId);
            request.AddParameter("client_secret", authConfig.ClientSecret);
            request.AddParameter("scope", authConfig.Scope);
            request.AddParameter("username", username);
            request.AddParameter("password", password);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            if (response.Content.Contains("error"))
                throw new UnauthorizedAccessException();
            return System.Text.Json.JsonSerializer.Deserialize<TokenModel>(response.Content);
        }
        public TokenModel GetToken(string refreshToken)
        {
            var client = new RestClient("https://localhost:5001/connect/token");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddParameter("grant_type", "refresh_token");
            request.AddParameter("client_id", authConfig.ClientId);
            request.AddParameter("client_secret", authConfig.ClientSecret);
            request.AddParameter("refresh_token", refreshToken);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
            return System.Text.Json.JsonSerializer.Deserialize<TokenModel>(response.Content);
        }
        public int UserCount()
        {
            return userRepository.GetAllQueryable().Count();
        }

    }
}
