'use server'

import { getProcessVariableRequired } from "../utils";

type ResponseData = {
	access_token: string
	token_type: string
	scope: string
	expires_in: number
	refresh_token: string
}

export async function getSpotifyAccessToken(code: string) {
	const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
	const headers = getHeaders()
	const body = getBody(code)

	const response = await fetch(spotifyTokenUrl, {
		method: 'POST',
		headers: headers,
		body: body,
	})

	const data = await response.json() as ResponseData

	console.log(data)


}

function getHeaders(){
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
	
	// const body = {
	// 	grant_type: grantType,
	// 	code: code,
	// 	redirect_uri: redirectUri,
	// }

	// return body
}