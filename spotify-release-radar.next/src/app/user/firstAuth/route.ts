'use server'

import { spotifyAuthResponseType } from "@/lib/auth/redirectToSpotifyLogin"
import { setCookie } from "@/lib/cookies"
import { getSpotifyFirstAccessToken } from "@/lib/spotifyCalls/getSpotifyAccessToken"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
	const spotifyCode = req.nextUrl.searchParams.get(spotifyAuthResponseType) as string
	const accessToken = await getSpotifyFirstAccessToken(spotifyCode)
	
	await setCookie('spotify_access_token', JSON.stringify(accessToken))

	redirect('/user')
}
