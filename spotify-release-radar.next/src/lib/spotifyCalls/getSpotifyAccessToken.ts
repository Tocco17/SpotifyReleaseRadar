'use server'

import { getCookie } from "../cookies";
import { AccessToken } from "../models/AccessToken";
import { getProcessVariableRequired } from "../utils";

export async function getSpotifyFirstAccessToken(code: string) {
	const redirectUri = getProcessVariableRequired('SpotifyAuthRedirectUri')

	const params = new URLSearchParams()
	params.append('grant_type', 'authorization_code')
	params.append('code', code)
	params.append('redirect_uri', redirectUri)

	return getSpotifyAccessToken(params)
}

export async function getSpotifyRefreshedAccessToken() {
	const accessToken = await getCookie<AccessToken>("spotify_access_token")
	if(!accessToken)
		throw new Error("AccessToken not saved for the refreshing process.")

	const params = new URLSearchParams()
	params.append('grant_type', 'refresh_token')
	params.append('refresh_token', accessToken.refresh_token)

	return getSpotifyAccessToken(params)
}

async function getSpotifyAccessToken(params: URLSearchParams) {
	const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
	const headers = getHeaders()

	const response = await fetch(spotifyTokenUrl, {
		method: 'POST',
		headers: headers,
		body: params.toString(),
	})

	const data = (await response.json()) as AccessToken

	return data
}

function getHeaders() {
	const clientId = getProcessVariableRequired('SpotifyClientId')
	const clientSecret = getProcessVariableRequired('SpotifyClientSecret')

	const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
	const contentType = 'application/x-www-form-urlencoded'

	const headers = {
		'content-type': contentType,
		'Authorization': `Basic ${authHeader}`
	}

	return headers
}