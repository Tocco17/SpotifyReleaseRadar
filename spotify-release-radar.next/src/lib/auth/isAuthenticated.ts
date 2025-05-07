import { NextRequest } from "next/server"
import { spotifyAuthResponseType } from "./redirectToSpotifyLogin"

export type AuthStatus = 'NotAuthenticated' | 'Authenticated' | 'RedirectToAuthLink' | 'FirstAuthentication'

export async function isAuthenticated(req: NextRequest): Promise<AuthStatus> {
	const codeFromQuery = req.nextUrl.searchParams.get(spotifyAuthResponseType)
	const cookieCode = req.cookies.get(spotifyAuthResponseType)?.value

	if (!codeFromQuery && !cookieCode)
		return 'NotAuthenticated'

	if (!codeFromQuery && !!cookieCode)
		return 'RedirectToAuthLink'

	if (!!codeFromQuery && !cookieCode)
		return "FirstAuthentication"

	return 'Authenticated'
}