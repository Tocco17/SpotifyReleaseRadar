namespace SpotifyReleaseRadar.API.Utilities.Extensions;

public static class PrimitiveUtility
{
	public static string ToNotNullOrWhiteSpaceString(this string? value)
	{
		if(string.IsNullOrWhiteSpace(value))
		{
			throw new ArgumentNullException(nameof(value), "Value cannot be null or empty.");
		}

		return value!;
	}

	public static string ToNotNullOrEmptyString(this string? value)
	{
		if(string.IsNullOrEmpty(value))
		{
			throw new ArgumentNullException(nameof(value), "Value cannot be null or empty.");
		}

		return value!;
	}
}
