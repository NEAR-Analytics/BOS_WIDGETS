const { tokenAddress, owner, spender, decimals, updateAllowance } = props;

const AllowanceABI = [
  "function allowance(address owner, address spender) external view returns (uint256)",
];

function getAllowance(_tokenAddress, _owner, _spender) {
  const TokenContract = new ethers.Contract(
    _tokenAddress,
    AllowanceABI,
    Ethers.provider()
  );
  TokenContract.allowance(_owner, _spender)
    .then((allowanceRaw) => {
      console.info(`get ${_tokenAddress} allowance:`, allowanceRaw.toString());

      //for use: ethers.utils.formatUnits(allowanceRaw,decimals)
      updateAllowance(allowanceRaw);
    })
    .catch((e) => {
      console.log("getAllowance_error", e);
    });
}

if (tokenAddress && owner && spender) {
  getAllowance(tokenAddress, owner, spender);
}

return "";
