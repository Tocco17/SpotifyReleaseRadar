import { getFetch } from "./spotifyCallApi";

export async function getCurrentUserProfile() {
	const response = await getFetch<CurrentUserProfile>('https://api.spotify.com/v1/me')
	return response
}

export type CurrentUserProfile = {
	country: string,
	display_name: string,
	email: string,
	explicit_content: {
		filter_enabled: boolean,
		filter_locked: boolean
	},
	external_urls: {
		spotify: string
	},
	followers: {
		href: string,
		total: number,
	},
	href: string,
	id: string,
	images: [
		{
			url: string,
			height: number,
			width: number
		}
	],
	product: string,
	type: string,
	uri: string
}