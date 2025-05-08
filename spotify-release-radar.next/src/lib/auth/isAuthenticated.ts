import { NextRequest } from "next/server"
import { spotifyAuthResponseType } from "./redirectToSpotifyLogin"
import { getProcessVariableRequired } from "../utils"
import { getCookie } from "../cookies"
import { AccessToken } from "../models/AccessToken"

export type AuthStatus = 'NotAuthenticated' | 'Authenticated' | 'FirstAuthentication'

export async function isAuthenticated(req: NextRequest): Promise<AuthStatus> {
	const accessToken = await getAccessToken()
	const isFirstAuth = isFirstAuthenticationLink(req)

	if(!accessToken)
		return isFirstAuth 
			? 'FirstAuthentication'
			: 'NotAuthenticated'

	return 'Authenticated'
}

async function getAccessToken(){
	const cookieCode = await getCookie("spotify_access_token")
	if(!cookieCode)
		return undefined

	const accessToken = JSON.parse(cookieCode.value) as AccessToken
	return accessToken
}

function isFirstAuthenticationLink(req: NextRequest) {
	const spotifyRedirectUrl = getProcessVariableRequired('SpotifyAuthRedirectUri')
	const spotifyRedirectPath = (new URL(spotifyRedirectUrl)).pathname
	const currentPath = req.nextUrl.pathname

	return spotifyRedirectPath === currentPath
}