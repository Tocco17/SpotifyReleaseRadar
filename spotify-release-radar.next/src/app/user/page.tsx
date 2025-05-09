'use server'

import { getCurrentUserProfile } from "@/lib/spotifyCalls/getCurrentUserProfile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


async function getUserData() {
	const userData = await getCurrentUserProfile()
	console.log(userData)

	return userData
}

export default async function UserPage() {
	const userData = await getUserData()

	return (<>
		<p>Welcome {userData.display_name}</p>
		{
			userData.images && userData.images[0]?.url &&
			<Avatar>
				<AvatarImage src={userData.images[0].url} />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		}
	</>)
}