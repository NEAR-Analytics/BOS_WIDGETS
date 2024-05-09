const { tokenAddress, owner, updateTokenBalance, place } = props;

const ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

function getTokenBalance(_tokenAddress, _owner) {
  const TokenContract = new ethers.Contract(
    _tokenAddress,
    ABI,
    Ethers.provider()
  );

  TokenContract.balanceOf(_owner)
    .then((balanceRaw) => {
      console.log("BALANCE:", _tokenAddress, balanceRaw.toString());
      TokenContract.decimals().then((decimals) => {
        const bal = Big(
          ethers.utils.formatUnits(balanceRaw, decimals)
        ).toFixed();

        updateTokenBalance(bal);
      });
    })
    .catch((err) => {
      console.info("getTokenBal_error:", err);
    });
}

// if you need fresh the balance,you only need fresh the render func.
if (tokenAddress && owner) {
  getTokenBalance(tokenAddress, owner);
}

return "";
