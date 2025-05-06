import { NextRequest, NextResponse } from "next/server";
import { getProcessVariableRequired } from "./lib/utils";

export async function middleware(req: NextRequest) {
	if (!!(await isAuthenticated(req)))
		return undefined

	const authUrl = getAuthUrl(req)
	
	return NextResponse.redirect(authUrl)
}

async function isAuthenticated(req: NextRequest) {
	return false
}

export const config = {
	matcher: "/user/:path*"
}

function getAuthUrl(req: NextRequest){
	const authUrl = process.env.SpotifyAuthorizeUrl
	if(!authUrl)
		throw new Error("Auth url not present.")
	
	const params = getAuthParams(req)

	const url = new URL(authUrl)
	url.searchParams.set('response_type', params.responseType)
	url.searchParams.set('client_id', params.clientId)
	url.searchParams.set('redirect_uri', params.redirectUrl)

	return url
}

function getAuthParams(req: NextRequest) {
	const path = req.nextUrl.pathname;
	
	const clientId = getProcessVariableRequired('SpotifyClientId')
	const redirectUrl = getProcessVariableRequired('SpotifyAuthRedirectUrl')
	const clientSecret = getProcessVariableRequired('SpotifyClientSecret')
	const responseType = getProcessVariableRequired('SpotifyAuthResponseType')

	console.log('redirect ' + redirectUrl)

	return {
		clientId,
		redirectUrl,
		clientSecret,
		responseType,
	}
}