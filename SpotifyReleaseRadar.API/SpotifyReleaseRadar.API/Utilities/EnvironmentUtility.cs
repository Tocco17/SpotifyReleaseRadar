namespace SpotifyReleaseRadar.API.Utilities;

public static class EnvironmentUtility
{
	public static string GetEnvironmentVariable(EnvironmentKey key)
	{
		var value = Environment.GetEnvironmentVariable(key.ToString());
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