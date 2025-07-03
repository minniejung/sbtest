import { ethers } from 'ethers'

import SbtTestAbi from '../../../../contract/abis/SbtTest.json'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SBT_CONTRACT_ADDRESS || ''

export function getSbtContract(signerOrProvider: ethers.Signer | ethers.Provider) {
	return new ethers.Contract(CONTRACT_ADDRESS, SbtTestAbi.abi, signerOrProvider)
}
