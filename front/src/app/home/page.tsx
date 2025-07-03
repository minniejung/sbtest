'use client'

// import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useDisconnect } from 'wagmi'

// import { useBalance } from 'wagmi'

import { useMintNft } from '@/hooks/useMintNft'
import { useUserBadges } from '@/hooks/useUserBadge'
import { cn } from '@/utils/helpers/cn'
import { BadgeType } from '@/utils/types/wallet.types'
import { TwitterLoginButton } from '@/components/buttons/TwitterLoginButton'

const Home = () => {
	const { address } = useAccount()

	const { data: balance } = useBalance({
		address,
	})
	// const { connect } = useConnect()
	const { disconnect } = useDisconnect()

	const { mint, loading } = useMintNft()
	const { hasRetweet, hasFollower } = useUserBadges(address)

	const handleMint = async (badgeId: BadgeType) => {
		if (!address) return

		await mint(address, badgeId, {
			onSuccess: receipt => {
				console.log('Mint successful!', receipt)
			},
			onError: err => {
				console.log('error:', err)
			},
		})
	}

	return (
		<div className='flex flex-col justify-center gap-10'>
			{/* <ConnectButton chainStatus='name' accountStatus='address' /> */}

			<div className='space-y-4 rounded-lg pr-4 text-sm'>
				<div>Address: {address ?? ''}</div>
				<div>
					Balance: {balance && balance?.value} {balance && balance.symbol}
				</div>
				<button onClick={() => disconnect()} className='font-semibold'>
					Disconnect
				</button>
			</div>

			<div className='flex flex-row gap-4'>
				<button
					onClick={() => handleMint(0)}
					disabled={loading || hasRetweet}
					className={cn(
						'mt-10 rounded-lg border border-black px-4 py-2',
						(loading || hasRetweet) && 'cursor-not-allowed opacity-50',
					)}>
					{loading ? 'Minting...' : 'Mint Badge 0'}
				</button>
				<button
					onClick={() => handleMint(1)}
					disabled={loading || hasFollower}
					className={cn(
						'mt-10 rounded-lg border border-black px-4 py-2',
						(loading || hasRetweet) && 'cursor-not-allowed opacity-50',
					)}>
					{loading ? 'Minting...' : 'Mint Badge 1'}
				</button>
			</div>

			<div className='mt-10 space-y-2'>
				<h2 className='text-lg font-bold'>Your Badges</h2>

				<p>Retweet Badge: {hasRetweet ? '✅ Claimed' : '❌ Not yet'}</p>
				<p>Follower Badge: {hasFollower ? '✅ Claimed' : '❌ Not yet'}</p>
			</div>

			<div className='mt-10'>
				<TwitterLoginButton />
			</div>
		</div>
	)
}

export default Home

{
	/* <div>address: {address || 'Not connected'}</div>
			<div>balance: {balance ? `${balance.formatted} ${balance.symbol}` : 'Loading...'}</div> */
}
{
	/* <button onClick={() => connect({ connector: injected() })} className='rounded-lg border border-black p-4'>
				Connect
			</button> */
}
