'use server'

import { AccessToken } from "../models/AccessToken";
import { getProcessVariableRequired } from "../utils";

export async function getSpotifyAccessToken(code: string) {
	const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
	const headers = getHeaders()
	const body = getBody(code)

	const response = await fetch(spotifyTokenUrl, {
		method: 'POST',
		headers: headers,
		body: body,
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

function getBody(code: string) {
	const redirectUri = getProcessVariableRequired('SpotifyAuthRedirectUri')
	const grantType = 'authorization_code'

	const params = new URLSearchParams()
	params.append('grant_type', grantType)
	params.append('code', code)
	params.append('redirect_uri', redirectUri)

	return params.toString()
}