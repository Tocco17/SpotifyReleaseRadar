namespace SpotifyReleaseRadar.API.Services.Interfaces;

public interface ISpotifyAuthentication
{
	public Task<string> GetLoginUrlPage();
	public Task GetAccessToken();
	public Task GetRefreshedAccessToken();
}
