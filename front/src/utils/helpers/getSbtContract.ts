import { ethers } from 'ethers'

import SbtTestAbi from '../../../../contract/abis/SbtTest.json'

const CONTRACT_ADDRESS = '0x5cdd46a3f92e2537ca08eedc30cd097ada78d6a7'

export function getSbtContract(signerOrProvider: ethers.Signer | ethers.Provider) {
	return new ethers.Contract(CONTRACT_ADDRESS, SbtTestAbi.abi, signerOrProvider)
}
