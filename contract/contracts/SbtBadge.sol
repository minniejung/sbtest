// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IERC5192.sol";

contract SbtBadge is ERC721, IERC5192, Ownable {
    using Strings for uint256;

    enum BadgeType { RETWEET, FOLLOWER }

    uint256 private _nextTokenId = 1;

    // Prevent duplicate badge mints per user
    mapping(address => mapping(BadgeType => bool)) public hasBadge;

    // tokenId => Badge info
    mapping(uint256 => BadgeType) public badgeTypes;

    event BadgeMinted(address indexed to, uint256 indexed tokenId, BadgeType badgeType);

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {}

    function mintBadge(address to, BadgeType badgeType) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(!hasBadge[to][badgeType], "User already owns this badge");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        hasBadge[to][badgeType] = true;
        badgeTypes[tokenId] = badgeType;

        emit BadgeMinted(to, tokenId, badgeType);
    }

    function getBadgeType(uint256 tokenId) external view returns (BadgeType) {
        require(_tokenExists(tokenId), "Nonexistent token");
        return badgeTypes[tokenId];
    }

    function getUserBadges(address user) external view returns (bool hasRetweet, bool hasFollower) {
        hasRetweet = hasBadge[user][BadgeType.RETWEET];
        hasFollower = hasBadge[user][BadgeType.FOLLOWER];
    }

    function locked(uint256 tokenId) external view override returns (bool) {
        require(_tokenExists(tokenId), "Nonexistent token");
        return true;
    }

    function _tokenExists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        require(from == address(0) || to == address(0), "SBT: non-transferable");
        return super._update(to, tokenId, auth);
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not your badge");
        require(_tokenExists(tokenId), "Nonexistent token");

        BadgeType badgeType = badgeTypes[tokenId];
        delete hasBadge[msg.sender][badgeType];
        delete badgeTypes[tokenId];

        _burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return
            interfaceId == type(IERC5192).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
