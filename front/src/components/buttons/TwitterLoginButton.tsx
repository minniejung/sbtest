'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export const TwitterLoginButton = () => {
	const { data: session } = useSession()

	return (
		<div>
			{session ? (
				<>
					<p>Signed in as {session.user?.name}</p>
					<button onClick={() => signOut()}>Sign out</button>
				</>
			) : (
				<button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
			)}
		</div>
	)
}
