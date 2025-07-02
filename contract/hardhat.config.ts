import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545", 
      accounts: [
        process.env.PRIVATE_KEY || "",
      ],
    },
    kaia: {
      url: "https://public-en-kairos.node.kaia.io",
      accounts: [process.env.PRIVATE_KEY_METAMASK || ""],
    },
  },
};

export default config;
