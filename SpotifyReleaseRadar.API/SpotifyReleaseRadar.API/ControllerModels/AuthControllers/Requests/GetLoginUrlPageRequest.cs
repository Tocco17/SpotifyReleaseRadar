using System.ComponentModel.DataAnnotations;

using SpotifyReleaseRadar.API.ControllerModels.Abstracts;

namespace SpotifyReleaseRadar.API.ControllerModels.AuthControllers.Requests;

public class GetLoginUrlPageRequest : GetRequest
{
	[Required] public string ClientId { get; set; } = null!;
	[Required] public string RedirectUri { get; set; } = null!;
	[Required] public string ClientSecret { get; set; } = null!;
	[Required] public string ResponseType { get; set; } = null!;
}
