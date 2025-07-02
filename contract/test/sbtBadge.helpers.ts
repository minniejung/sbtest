import { ethers } from "hardhat";

export async function deploySbtBadge(name: string, symbol: string) {
  const SbtBadge = await ethers.getContractFactory("SbtBadge");
  const sbt = await SbtBadge.deploy(name, symbol);
  await sbt.waitForDeployment();
  return sbt;
}

// Use enum index: 0 for RETWEET, 1 for FOLLOWER
export async function mintSbt(
  sbt: any,
  to: string,
  badgeType: number,
  caller?: any
) {
  const contract = caller ? sbt.connect(caller) : sbt;
  return contract.mintBadge(to, badgeType);
}

export async function burnBadge(sbt: any, tokenId: number, caller: any) {
  return sbt.connect(caller).burn(tokenId);
}

export async function getOwnerOf(sbt: any, tokenId: number) {
  return sbt.ownerOf(tokenId);
}

export async function isLocked(sbt: any, tokenId: number) {
  return sbt.locked(tokenId);
}

export async function tryTransfer(
  sbt: any,
  from: any,
  to: string,
  tokenId: number
) {
  return sbt.connect(from).transferFrom(from.address, to, tokenId);
}

export async function getBadgeType(sbt: any, tokenId: number) {
  return sbt.getBadgeType(tokenId);
}
