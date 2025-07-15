using SpotifyReleaseRadar.API.ControllerModels.Interfaces;

namespace SpotifyReleaseRadar.API.ControllerModels.Abstracts;

public abstract class GetRequest : IGetRequest
{
	public virtual string ToQueryString()
	{
		var properties = GetType().GetProperties()
			.Where(p => p.GetValue(this) != null)
			.Select(p => $"{p.Name}={Uri.EscapeDataString(p.GetValue(this)?.ToString() ?? string.Empty)}");
		return string.Join("&", properties);
	}
}
