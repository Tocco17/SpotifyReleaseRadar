import { NextRequest, NextResponse } from "next/server";
import { spotifyAuthResponseType } from "./redirectToSpotifyLogin";

export function redirectToAuthLink(req: NextRequest) {
	const cookieCode = req.cookies.get(spotifyAuthResponseType)?.value

	if(!cookieCode)
		throw new Error('cookieCode not present in redirectToAuthLink')
	
	const url = req.nextUrl.clone()
	url.searchParams.set(spotifyAuthResponseType, cookieCode)

	return NextResponse.redirect(url)
}