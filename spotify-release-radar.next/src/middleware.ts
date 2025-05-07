import { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth/isAuthenticated";
import { redirectToSpotifyLogin } from "./lib/auth/redirectToSpotifyLogin";
import { redirectToFirstAuthentication } from "./lib/auth/redirectToFirstAuthentication";
import { redirectToAuthenticated } from "./lib/auth/redirectToAuthenticated";

export async function middleware(req: NextRequest) {
	const authStatus = await isAuthenticated(req)

	if (authStatus === "Authenticated")
		return redirectToAuthenticated(req)

	if (authStatus === "NotAuthenticated")
		return redirectToSpotifyLogin(req)

	if (authStatus === "FirstAuthentication")
		return redirectToFirstAuthentication(req)
}

export const config = {
	matcher: "/user/:path*"
}


/*
Not auth
	Si va su spotify con un login
	Rimanda al link segnato
		Successo:
			code
			state
		Errore:
			error
			state
	
	Si richiede un access token con una chiamata POST all'API di spotify


*/