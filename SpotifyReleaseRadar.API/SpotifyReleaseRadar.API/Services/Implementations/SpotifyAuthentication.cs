
using SpotifyReleaseRadar.API.ControllerModels.AuthControllers.Requests;
using SpotifyReleaseRadar.API.ControllerModels.AuthControllers.Responses;
using SpotifyReleaseRadar.API.Services.Interfaces;
using SpotifyReleaseRadar.API.Utilities;
using SpotifyReleaseRadar.API.Utilities.Extensions;

namespace SpotifyReleaseRadar.API.Services.Implementations;

public class SpotifyAuthentication : ISpotifyAuthentication
{
	public Task GetAccessToken()
	{

		throw new NotImplementedException();
	}

	public Task<string> GetLoginUrlPage()
	{
		var authUrl = EnvironmentUtility.GetEnvironmentVariable(EnvironmentKey.SpotifyAuthorizeUrl).ToNotNullOrWhiteSpaceString();
		var clientId = EnvironmentUtility.GetEnvironmentVariable(EnvironmentKey.SpotifyClientId).ToNotNullOrWhiteSpaceString();
		var clientSecret = EnvironmentUtility.GetEnvironmentVariable(EnvironmentKey.SpotifyClientSecret).ToNotNullOrWhiteSpaceString();
		var redirectUri = EnvironmentUtility.GetEnvironmentVariable(EnvironmentKey.SpotifyAuthRedirectUri).ToNotNullOrWhiteSpaceString();
		var spotifyAuthResponseType = nameof(GetLoginUrlPageResponse.Code).ToNotNullOrWhiteSpaceString();

		var request = new GetLoginUrlPageRequest
		{
			ClientId = clientId,
			RedirectUri = redirectUri,
			ResponseType = spotifyAuthResponseType,
			ClientSecret = clientSecret,
		};

		var url = $"{authUrl}?{request.ToQueryString()}";
		return Task.FromResult(url);
	}

	public Task GetRefreshedAccessToken()
	{
		throw new NotImplementedException();
	}
}
