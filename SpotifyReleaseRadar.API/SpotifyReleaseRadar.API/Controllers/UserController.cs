

using Microsoft.AspNetCore.Mvc;

using SpotifyReleaseRadar.API.ControllerModels.UserControllers.Requests;
using SpotifyReleaseRadar.API.ControllerModels.UserControllers.Responses;

namespace SpotifyReleaseRadar.API.Controllers;

public class UserController : ControllerBase
{
	private readonly IJwtService _jwtService;

	[HttpPost]
	public ActionResult<LoginResponse> Login([FromBody] LoginRequest req)
	{
		if (req is null)
			return this.BadRequest("Invalid login request");

		try
		{
			var loginResult = this._jwtService.Login(req);
			if (loginResult is not null)
				return this.Ok(loginResult);
		}
		catch (Exception ex)
		{
			this._logger.LogError(ex, "Login process failed");
		}

		return this.Unauthorized();
	}
}
