import { NextRequest, NextResponse } from "next/server"
import { getProcessVariableRequired } from "../utils"

export const spotifyAuthResponseType = 'code'

export function redirectToSpotifyLogin(req: NextRequest) {
	const authUrl = getAuthUrl(req)
	return NextResponse.redirect(authUrl)
}

function getAuthUrl(req: NextRequest) {
	const authUrl = process.env.SpotifyAuthorizeUrl
	if (!authUrl)
		throw new Error("Auth url not present.")

	const params = getAuthParams(req)

	const url = new URL(authUrl)
	url.searchParams.set('response_type', params.responseType)
	url.searchParams.set('client_id', params.clientId)
	url.searchParams.set('redirect_uri', params.redirectUrl)

	return url
}

function getAuthParams(req: NextRequest) {
	const clientId = getProcessVariableRequired('SpotifyClientId')
	const redirectUrl = getProcessVariableRequired('SpotifyAuthRedirectUrl')
	const clientSecret = getProcessVariableRequired('SpotifyClientSecret')
	const responseType = spotifyAuthResponseType

	return {
		clientId,
		redirectUrl,
		clientSecret,
		responseType,
	}
}