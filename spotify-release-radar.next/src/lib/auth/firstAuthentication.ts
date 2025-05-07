import { NextRequest, NextResponse } from "next/server";
import { spotifyAuthResponseType } from "./redirectToSpotifyLogin";

export function firstAuthentication(req: NextRequest) {
	const codeFromQuery = req.nextUrl.searchParams.get(spotifyAuthResponseType)

	if(!codeFromQuery)
		throw new Error('CodeFromQuery not present in firstAuthentication')
	
	const res = NextResponse.next()
	res.cookies.set(spotifyAuthResponseType, codeFromQuery, {
		httpOnly: true,   // evita accesso da JavaScript lato client
		secure: true,     // solo HTTPS (in produzione è raccomandato)
		path: '/',        // disponibile per tutte le rotte
		sameSite: 'lax',  // protegge da CSRF, ma consente OAuth
		// maxAge: 60 * 60   // opzionale: tempo di vita in secondi
	})

	return res
}