import { setCookie } from "@/lib/cookies"
import { getSpotifyRefreshedAccessToken } from "@/lib/spotifyCalls/getSpotifyAccessToken"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const refreshedToken = await getSpotifyRefreshedAccessToken()
	await setCookie('spotify_access_token', JSON.stringify(refreshedToken))

	const response = NextResponse.json({ success: true })
	response.cookies.set('spotify_access_token', JSON.stringify(refreshedToken))

	return response
}