using Microsoft.AspNetCore.Mvc;

using SpotifyReleaseRadar.API.Services.Interfaces;

namespace SpotifyReleaseRadar.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
	private readonly ISpotifyAuthentication _spotifyAuthentication;

	public AuthController(ISpotifyAuthentication spotifyAuthentication)
	{
		_spotifyAuthentication = spotifyAuthentication;
	}

	[HttpGet("login")]
	public Task<IActionResult> GetLoginUrlPage([FromQuery])
	{
		var url = _spotifyAuthentication.GetLoginUrlPage();

		return Ok("Login endpoint");
	}

	[HttpGet("access-token")]
	public async Task<IActionResult> GetAccessToken([FromQuery])
	{
		var token = await _spotifyAuthentication.GetAccessToken();
		return Ok(token);
	}

	[HttpGet("access-token/refresh")]
	public async Task<IActionResult> RefreshToken()
	{
		var token = await _spotifyAuthentication.GetRefreshedAccessToken();
		return Ok(token);
	}
}
