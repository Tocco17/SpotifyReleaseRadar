namespace SpotifyReleaseRadar.API.ControllerModels.UserControllers.Responses;

public class LoginResponse
{
	public string AccessToken { get; set; }
	public string TokenType { get; set; }
	public int ExpiresIn { get; set; }
}
