'use server'

import { spotifyAuthResponseType } from "@/lib/auth/redirectToSpotifyLogin"
import { getSpotifyAccessToken } from "@/lib/spotifyCalls/getSpotifyAccessToken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function FirstAuth({
	searchParams
}: {
	searchParams: Promise<{ [spotifyAuthResponseType]: string }>
}) {
	const spotifyCode = (await searchParams)[spotifyAuthResponseType] as string
	const accessToken = await getSpotifyAccessToken(spotifyCode)

	const cookieStore = await cookies()

	cookieStore.set('spotify_access_token', JSON.stringify(accessToken))

	redirect('/user')
}