import { getCookie, setCookie } from "../cookies"
import { AccessToken } from "../models/AccessToken"
import { getProcessVariableRequired } from "../utils"
import { getSpotifyRefreshedAccessToken } from "./getSpotifyAccessToken"

async function fetchApi(call: () => Promise<Response>) {
	const response = await call()

	const status = response.status
	if (status !== 401)
		return response

	await refreshToken()
	return call()
}

async function refreshToken() {
	const refreshUrl = getProcessVariableRequired('SpotifyAuthRefreshUri')
	const response = fetch(refreshUrl, {
		method: 'GET'
	})
	return response
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

export async function getFetch<TResponse>(url: string, params?: Record<string, any>) {
	const queriedUrl = getUrlWithQuery(url, params)

	const call = async () => {
		const headers = await getHeaders()

		const response = fetch(queriedUrl, {
			method: 'GET',
			headers,
		})

		return response
	}

	const response = await fetchApi(call)
	const data = response.json() as TResponse
	return {
		response,
		data,
	}
}

function getUrlWithQuery(url: string, params?: Record<string, any>) {
	if (!params)
		return url

	const queryString = new URLSearchParams(params).toString()
	return `${url}${url.includes('?') ? '&' : '?'}${queryString}`
}