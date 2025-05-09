import { getFetch } from "./spotifyCallApi"

export async function getFollowedArtists(params: GetFollowedArtistRequest) {
	const paramsForSpotify: GetFollowedArtistRequestForSpotify = {
		...params,
		type: 'artist',
	}
	const response = await getFetch<GetFollowedArtistResponse>('https://api.spotify.com/v1/me/following?type=artist', paramsForSpotify)
	return response
}

export type GetFollowedArtistRequest = {
	after?: string
	limit?: number
}

type GetFollowedArtistRequestForSpotify = GetFollowedArtistRequest & {
	type: 'artist'
}

export type GetFollowedArtistResponse = {
	artists: {
		href: string,
		limit: number,
		next: string,
		cursors: {
			after: string,
			before: string,
		},
		total: number,
		items: {
			external_urls: {
				spotify: string,
			},
			followers: {
				href: string,
				total: number,
			},
			genres: string[],
			href: string,
			id: string,
			images: {
				url: string,
				height: number,
				width: number,
			}[],
			name: string,
			popularity: number,
			type: "artist",
			uri: string,
		}[]
	}
}
