'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
// import { useBalance } from 'wagmi'

import { useMintNft } from '@/hooks/useMintNft'

const Home = () => {
	const { address } = useAccount()

	// const { data: balance } = useBalance({
	// 	address,
	// })
	// const { connect } = useConnect()
	const { disconnect } = useDisconnect()

	const { mint, loading } = useMintNft()

	const handleMint = async () => {
		// const tokenURI =
		// 	'https://lavender-left-coyote-594.mypinata.cloud/ipfs/bafybeig7ow34ri2tzrnwr2n26gxdmml72au52h7r32zp6cw7j6w4segkdu'
		const tokenId = 1
		if (!address) return

		await mint(address, tokenId, {
			onSuccess: receipt => {
				console.log('Mint successful!', receipt)
			},
			onError: err => {
				console.log('error:', err)
			},
		})
	}
	return (
		<div className='flex flex-col items-end justify-center gap-2'>
			{/* <div>address: {address || 'Not connected'}</div>
			<div>balance: {balance ? `${balance.formatted} ${balance.symbol}` : 'Loading...'}</div> */}
			{/* <button onClick={() => connect({ connector: injected() })} className='rounded-lg border border-black p-4'>
				Connect
			</button> */}
			<ConnectButton chainStatus='name' accountStatus='address' />
			<button onClick={() => disconnect()} className='rounded-lg pr-4 text-sm font-semibold'>
				Disconnect
			</button>

			<button onClick={handleMint} disabled={loading} className='mt-10 rounded-lg border border-black px-4 py-2'>
				{loading ? 'Minting...' : 'Mint SBT'}
			</button>
		</div>
	)
}

export default Home
