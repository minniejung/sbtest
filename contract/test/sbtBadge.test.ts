import { expect } from "chai";
import { ethers } from "hardhat";
import {
  deploySbtBadge,
  mintSbt,
  burnBadge,
  getOwnerOf,
  isLocked,
  tryTransfer,
} from "./sbtBadge.helpers";

describe("SbtTest Soulbound Token", function () {
  let sbt: any;
  let owner: any;
  let user: any;

  const NAME = "SoulboundTest";
  const SYMBOL = "SBT";

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    sbt = await deploySbtBadge(NAME, SYMBOL);
  });

  it("should mint a soulbound token to user", async function () {
    const tx = await mintSbt(sbt, user.address, 0, owner); // 0 = RETWEET
    await tx.wait();

    expect(await getOwnerOf(sbt, 1)).to.equal(user.address);
    expect(await isLocked(sbt, 1)).to.equal(true);
  });

  it("should not allow transfer of the token", async function () {
    await mintSbt(sbt, user.address, 1, owner);
    await expect(tryTransfer(sbt, user, owner.address, 1)).to.be.revertedWith(
      "SBT: non-transferable"
    );
  });

  it("should allow the owner to burn their token", async function () {
    await mintSbt(sbt, user.address, 1, owner);
    await burnBadge(sbt, 1, user);
    await expect(getOwnerOf(sbt, 1)).to.be.reverted;
  });

  it("should not allow non-owners to mint", async function () {
    await expect(mintSbt(sbt, user.address, 0, user))
      .to.be.revertedWithCustomError(sbt, "OwnableUnauthorizedAccount")
      .withArgs(user.address);
  });
});
