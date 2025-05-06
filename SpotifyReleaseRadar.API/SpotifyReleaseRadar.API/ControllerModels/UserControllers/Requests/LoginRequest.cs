using System.ComponentModel.DataAnnotations;

namespace SpotifyReleaseRadar.API.ControllerModels.UserControllers.Requests;

public class LoginRequest
{
	[Required] public string Credential { get; set; } = string.Empty;

	[Required] public string Password { get; set; } = string.Empty;
}
