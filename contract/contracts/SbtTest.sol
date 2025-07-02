// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IERC5192.sol";

contract SbtTest is ERC721, IERC5192, Ownable {
    string private _baseTokenURI;
    event BaseTokenURISet(string newBaseTokenURI);

    // Always locked for SBTs
    function locked(uint256 tokenId) public view override returns (bool) {
        // Check if token exists by calling ownerOf (will revert if token doesn't exist)
        ownerOf(tokenId);
        return true;
    }

    constructor(string memory name_, string memory symbol_, string memory baseTokenURI_) ERC721(name_, symbol_) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // Only owner (backend) can mint after verifying missions
    function safeMint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
        emit Locked(tokenId);
    }

    // Block all transfers (SBTs are non-transferable)
    // from == address(0) allows minting (token doesn't exist yet)
    // to == address(0) allows burning (token is being burned)
    
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        require(from == address(0) || to == address(0), "SBT: non-transferable");
        return super._update(to, tokenId, auth);
    }

    // Optional: allow burning by owner of token
    function burn(uint256 tokenId) external {
        require(msg.sender == ownerOf(tokenId), "Not token owner");
        _burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721) returns (bool) {
        return interfaceId == type(IERC5192).interfaceId || super.supportsInterface(interfaceId);
    }

    function setBaseTokenURI(string memory newBaseTokenURI) external onlyOwner {
        _baseTokenURI = newBaseTokenURI;
        emit BaseTokenURISet(newBaseTokenURI);
    }
}