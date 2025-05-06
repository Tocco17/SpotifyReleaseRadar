using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;

using SpotifyReleaseRadar.API.ControllerModels.UserControllers.Requests;
using SpotifyReleaseRadar.API.ControllerModels.UserControllers.Responses;
using SpotifyReleaseRadar.API.Services.Interfaces;

namespace SpotifyReleaseRadar.API.Services.Implementations;

public class JwtService : IJwtService
{
	public Task<LoginResponse?> Login(LoginRequest req)
	{
		var spotifyAuthTokenUrl = Environment.GetEnvironmentVariable("SpotifyAuthTokenUrl");
		var spotifyClientId = Environment.GetEnvironmentVariable("SpotifyClientId");
		var spotifyClientSecret = Environment.GetEnvironmentVariable("SpotifyClientSecret");

		var response = APICall.Post<LoginResponse>(spotifyAuthTokenUrl, new
		{
			grant_type = "authorization_code",
			code = req.Code,
			redirect_uri = req.RedirectUri,
			client_id = spotifyClientId,
			client_secret = spotifyClientSecret
		});

		return response;
	}
}
