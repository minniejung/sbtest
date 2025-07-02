'use client'

import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { kaia, kairos, mainnet, polygon } from 'wagmi/chains'

export const config = createConfig({
	chains: [mainnet, polygon, kaia, kairos],
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
		[kaia.id]: http(),
		[kairos.id]: http(),
	},
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<RainbowKitProvider theme={darkTheme({ overlayBlur: 'small' })}>{children}</RainbowKitProvider>
		</WagmiProvider>
	)
}
