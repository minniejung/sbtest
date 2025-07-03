import { BrowserProvider, JsonRpcSigner } from 'ethers'

export type MetaMaskAccountType = {
	address: string
	provider: BrowserProvider
	signer: JsonRpcSigner
	isMetaMask: true
}

export enum BadgeType {
	RETWEET = 0,
	FOLLOWER = 1,
}
