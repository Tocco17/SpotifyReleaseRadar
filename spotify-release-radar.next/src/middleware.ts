import { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth/isAuthenticated";
import { redirectToSpotifyLogin } from "./lib/auth/redirectToSpotifyLogin";
import { firstAuthentication } from "./lib/auth/firstAuthentication";
import { redirectToAuthLink } from "./lib/auth/redirectToAuthLink";

export async function middleware(req: NextRequest) {
	const authStatus = await isAuthenticated(req)

	if (authStatus === "Authenticated")
		return undefined

	if (authStatus === "NotAuthenticated")
		return redirectToSpotifyLogin(req)

	if (authStatus === "FirstAuthentication")
		return firstAuthentication(req)

	if(authStatus === "RedirectToAuthLink")
		return redirectToAuthLink(req)
}

export const config = {
	matcher: "/user/:path*"
}