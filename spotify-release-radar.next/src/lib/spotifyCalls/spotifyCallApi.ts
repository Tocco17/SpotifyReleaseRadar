import { getCookie } from "../cookies"
import { AccessToken } from "../models/AccessToken"

async function getHeaders(){
	const accessToken = await getCookie<AccessToken>("spotify_access_token")

	if(!accessToken)
		throw new Error('Access token not present.')

	const headers = {
		Authorization: `Bearer ${accessToken.access_token}`
	}

	return headers
}

export async function getFetch(url: string) {
	const headers = await getHeaders()
	
	const response = fetch(url, {
		method: 'GET',
		headers,
	})

	return response
}

