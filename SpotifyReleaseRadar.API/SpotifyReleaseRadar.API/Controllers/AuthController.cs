using System;

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
	public async Task<ActionResult<string>> GetLoginUrlPage()
	{
		var url = await _spotifyAuthentication.GetLoginUrlPage();
		return Ok(url);
	}

	[HttpGet("access-token")]
	public async Task<IActionResult> GetAccessToken()
	{
		return Ok();
		//var token = await _spotifyAuthentication.GetAccessToken();
		//return Ok(token);
	}

	[HttpGet("access-token/refresh")]
	public async Task<IActionResult> RefreshToken()
	{
		return Ok();
		//var token = await _spotifyAuthentication.GetRefreshedAccessToken();
		//return Ok(token);
	}
}
