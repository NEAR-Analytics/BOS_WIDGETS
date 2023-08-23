const { address } = props;
if (!address) return "";

const account = Ethers.send("eth_requestAccounts", [])[0];
if (!account) return "";

if (address === "native") {
  const provider = Ethers.provider();
  provider.getBalance(account).then((rawBalance) => {
    props?.onLoad(rawBalance._hex);
  });
  return "";
}
const erc20Abi = Storage.privateGet("erc20Abi");
if (!erc20Abi) return "";
const TokenContract = new ethers.Contract(
  address,
  erc20Abi,
  Ethers.provider().getSigner()
);
TokenContract.balanceOf(account).then((rawBalance) => {
  props?.onLoad(rawBalance._hex);
});

return "";
