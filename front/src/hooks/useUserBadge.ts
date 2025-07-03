import { useEffect, useMemo, useState } from 'react'

import { Contract, ethers } from 'ethers'
import { toast } from 'react-toastify'

import NftAbi from '../../../contract/abis/SbtBadge.json'

export function useUserBadges(userAddress: string | undefined) {
	const [badges, setBadges] = useState({ hasRetweet: false, hasFollower: false })
	const [loading, setLoading] = useState(false)

	const contract = useMemo(() => {
		if (!userAddress || !window.ethereum) return null

		const contractAddress = NftAbi.address
		if (!contractAddress) {
			toast.error('Contract address missing in ABI')
			return null
		}

		try {
			const provider = new ethers.BrowserProvider(window.ethereum)
			return new Contract(contractAddress, NftAbi.abi, provider)
		} catch (err) {
			console.error('Contract init failed:', err)
			return null
		}
	}, [userAddress])

	useEffect(() => {
		if (!contract || !userAddress) return

		const fetchBadges = async () => {
			setLoading(true)
			try {
				const [hasRetweet, hasFollower] = await contract.getUserBadges(userAddress)
				setBadges({ hasRetweet, hasFollower })
			} catch (err) {
				console.error('Failed to fetch user badges', err)
			} finally {
				setLoading(false)
			}
		}

		fetchBadges()
	}, [contract, userAddress])

	return { ...badges, loading }
}
