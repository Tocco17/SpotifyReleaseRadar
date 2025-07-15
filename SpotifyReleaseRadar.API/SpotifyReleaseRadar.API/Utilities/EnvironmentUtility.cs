using System;

namespace SpotifyReleaseRadar.API.Utilities;

public static class EnvironmentUtility
{
	private static readonly IConfiguration _configuration;

	static EnvironmentUtility()
	{
		var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";

		_configuration = new ConfigurationBuilder()
			.SetBasePath(AppContext.BaseDirectory)
			.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
			.AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
			.Build();
	}

	public static string GetEnvironmentVariable(EnvironmentKey key)
	{
		var value = _configuration[key.ToString()];
		if (string.IsNullOrEmpty(value))
		{
			throw new ArgumentNullException($"Environment variable {key} is not set.");
		}
		return value;
	}
}

public enum EnvironmentKey
{
	SpotifyClientId,
	SpotifyClientSecret,
	SpotifyAuthorizeUrl,
	SpotifyAuthRedirectUri,
	SpotifyAuthRefreshUri,
}