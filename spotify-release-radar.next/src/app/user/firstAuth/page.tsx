'use server'

import { spotifyAuthResponseType } from "@/lib/auth/redirectToSpotifyLogin"
import { getSpotifyAccessToken } from "@/lib/spotifyCalls/getSpotifyAccessToken"

export default async function FirstAuth({
	searchParams
}: {
	searchParams:Promise< { [spotifyAuthResponseType]: string }>
}) {
	const spotifyCode = (await searchParams)[spotifyAuthResponseType] as string
	await getSpotifyAccessToken(spotifyCode)
	
	return (<>
		First Login
	</>)
}