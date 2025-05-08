'use server'

import { getCurrentUserProfile } from "@/lib/spotifyCalls/getCurrentUserProfile"

async function getUserData(){
	const userData = await getCurrentUserProfile()

	console.log('userData')
	console.log(userData)
	
	return userData
}

export default async function UserPage() {
	const userData = await getUserData()
	
	return (<>
		Hi
	</>)
}