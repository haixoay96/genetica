// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GeneNFT is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    event MintNFT(address to, uint256 tokenId);


    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("GeneNFT", "GNFT") {}

    function safeMint(address to) public onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        emit MintNFT(to, tokenId);
        return tokenId;
    }
}