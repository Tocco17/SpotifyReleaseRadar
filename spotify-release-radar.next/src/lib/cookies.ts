import { cookies } from "next/headers"

export type CookieKey = 'spotify_access_token'

export async function setCookie(key: CookieKey, data: string) {
	console.log('data ' + data)
	
	const cookieStore = await cookies()
	cookieStore.set(key, data)
}

export async function getCookie<TCookieType>(key: CookieKey) {
	const cookieStore = await cookies()
	const data = cookieStore.get(key)
	const valueStringified = data?.value

	if(!valueStringified)
		return undefined
	
	const value = JSON.parse(valueStringified) as TCookieType
	return value
}