import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

const handler = NextAuth({
	providers: [
		TwitterProvider({
			clientId: process.env.NEXT_PUBLIC_X_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_X_CLIENT_SECRET!,
			version: '1.0A',
		}),
	],
	session: {
		strategy: 'jwt',
	},
})

export { handler as GET, handler as POST }
