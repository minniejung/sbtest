'use client'

import { useCallback, useState } from 'react'

import { Contract, ethers } from 'ethers'
import { toast } from 'react-toastify'
import { useWalletClient } from 'wagmi'

import { BadgeType } from '@/utils/types/wallet.types'

import NftAbi from '../../../contract/abis/SbtBadge.json'

export const useMintNft = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const { data: walletClient } = useWalletClient()

	const mint = useCallback(
		async (
			to: string,
			badgeId: BadgeType,
			options?: {
				onSuccess?: (receipt: ethers.TransactionReceipt) => void
				onError?: (err: unknown) => void
			},
		) => {
			if (!walletClient) {
				toast.error('Wallet not connected')
				return null
			}

			if (!ethers.isAddress(to)) {
				toast.error('Invalid recipient address')
				return null
			}

			const contractAddress = NftAbi.address
			if (!contractAddress) {
				toast.error('Contract address missing in ABI')
				return null
			}

			try {
				setLoading(true)

				const provider = new ethers.BrowserProvider(window.ethereum)
				const signer = await provider.getSigner(walletClient.account.address)
				const contract = new Contract(contractAddress, NftAbi.abi, signer)

				toast.info('Minting NFT...')
				const tx = await contract.mintBadge(to, badgeId)
				toast.success('Transaction sent. Waiting for confirmation...')

				const receipt = await tx.wait()
				toast.success('NFT minted!')

				console.log('Mint receipt:', receipt)
				options?.onSuccess?.(receipt)
				return receipt
			} catch (err) {
				console.error('Mint failed:', err)
				toast.error('Mint failed')
				options?.onError?.(err)
				return null
			} finally {
				setLoading(false)
			}
		},
		[walletClient],
	)

	return { loading, mint }
}
