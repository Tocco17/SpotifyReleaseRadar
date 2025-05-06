using Microsoft.AspNetCore.WebUtilities;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace SpotifyReleaseRadar.API.Utilities;

public static class ApiCall
{
	public static async Task<TResult?> Get<TResult>(string url, Dictionary<string, string?> queryStringDatas, JsonSerializerOptions? jsonOption = null)
	{
		using var client = new HttpClient();

		var endpointUri = new Uri(QueryHelpers.AddQueryString(url, queryStringDatas));

		jsonOption ??= new(JsonSerializerDefaults.Web);
		jsonOption.Converters.Add(new JsonStringEnumConverter());

		var response = await client.GetFromJsonAsync<TResult>(endpointUri, jsonOption);

		return response;
	}

	public static async Task<TResult?> Post<TResult>(string url, object? body, JsonSerializerOptions? jsonOption = null)
	{
		using var client = new HttpClient();

		jsonOption ??= new(JsonSerializerDefaults.Web);
		jsonOption.Converters.Add(new JsonStringEnumConverter());

		var response = await client.PostAsJsonAsync(url, body, jsonOption);

		if (response.IsSuccessStatusCode)
			return await response.Content.ReadFromJsonAsync<TResult>(jsonOption);

		return default;
	}
}
