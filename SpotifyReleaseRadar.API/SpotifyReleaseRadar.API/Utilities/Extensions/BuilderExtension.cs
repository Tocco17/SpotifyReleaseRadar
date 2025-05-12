using SpotifyReleaseRadar.API.Services.Implementations;
using SpotifyReleaseRadar.API.Services.Interfaces;

namespace SpotifyReleaseRadar.API.Utilities.Extensions;

public static class BuilderExtension
{
	public static void AddDependencyInjection(this WebApplicationBuilder builder)
	{
		builder.AddServices();
	}

	private static void AddServices(this WebApplicationBuilder builder)
	{
	}
}


