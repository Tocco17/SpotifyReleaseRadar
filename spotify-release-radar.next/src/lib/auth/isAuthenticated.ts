import { NextRequest } from "next/server"
import { spotifyAuthResponseType } from "./redirectToSpotifyLogin"
import { getProcessVariableRequired } from "../utils"

export type AuthStatus = 'NotAuthenticated' | 'Authenticated' | 'RedirectToAuthLink' | 'FirstAuthentication'

export async function isAuthenticated(req: NextRequest): Promise<AuthStatus> {
	const spotifyRedirectUrl = getProcessVariableRequired('SpotifyAuthRedirectUri')
	const spotifyRedirectPath = new URL(spotifyRedirectUrl).pathname
	const currentPath = req.nextUrl.pathname

	if(spotifyRedirectPath === currentPath)
		return 'FirstAuthentication'

	return 'NotAuthenticated'
}