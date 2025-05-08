import { getCookie, setCookie } from "../cookies"
import { AccessToken } from "../models/AccessToken"
import { getSpotifyRefreshedAccessToken } from "./getSpotifyAccessToken"

async function fetchApi(call: () => Promise<Response>) {
	const response = await call()

	const status = response.status
	if(status !== 401)
		return response

	await refreshToken()
	return call()
}

async function refreshToken(){
	const refreshedToken = await getSpotifyRefreshedAccessToken()
	return setCookie('spotify_access_token', JSON.stringify(refreshedToken))
}


async function getHeaders() {
	const accessToken = await getCookie<AccessToken>("spotify_access_token")

	if (!accessToken)
		throw new Error('Access token not present.')

	const headers = {
		Authorization: `Bearer ${accessToken.access_token}`
	}

	return headers
}

export async function getFetch(url: string) {
	const call = async () => {
		const headers = await getHeaders()

		const response = fetch(url, {
			method: 'GET',
			headers,
		})

		return response
	}

	const response = fetchApi(call)
	return response
}