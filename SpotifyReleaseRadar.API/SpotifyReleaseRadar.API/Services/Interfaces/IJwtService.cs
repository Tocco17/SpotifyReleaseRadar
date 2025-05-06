using SpotifyReleaseRadar.API.ControllerModels.UserControllers.Requests;
using SpotifyReleaseRadar.API.ControllerModels.UserControllers.Responses;

namespace SpotifyReleaseRadar.API.Services.Interfaces;

public interface IJwtService
{
	Task<LoginResponse?> Login(LoginRequest req);
}
