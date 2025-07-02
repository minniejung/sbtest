import { ethers } from "hardhat";
import { makeAbi } from "./abiGenerator";

async function main() {
  const contractName = "SbtTest";
  const name = "Soulbound Token Test";
  const symbol = "SBT";
  const baseTokenURI =
    "https://lavender-left-coyote-594.mypinata.cloud/ipfs/bafybeig7ow34ri2tzrnwr2n26gxdmml72au52h7r32zp6cw7j6w4segkdu";

  if (!name || !symbol || !baseTokenURI) {
    throw new Error(
      "Todo: (scripts/deploy.ts) name, symbol, or baseTokenURI is empty"
    );
  }

  console.log(`Deploying contracts`);

  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(name, symbol, baseTokenURI);

  await contract.waitForDeployment();

  console.log(`Contract deployed at: ${contract.target}`);
  await makeAbi(`${contractName}`, contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
