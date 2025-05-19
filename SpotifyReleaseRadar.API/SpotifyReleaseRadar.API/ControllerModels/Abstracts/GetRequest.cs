using SpotifyReleaseRadar.API.ControllerModels.Interfaces;

namespace SpotifyReleaseRadar.API.ControllerModels.Abstracts;

public abstract class GetRequest : IGetRequest
{
	public virtual string ToQueryString()
	{
		throw new NotImplementedException();
	}
}
