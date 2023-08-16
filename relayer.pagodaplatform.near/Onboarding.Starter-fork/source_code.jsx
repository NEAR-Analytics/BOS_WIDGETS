// const { contractAddress, contractABI } = fetch(
//   "https://raw.githubusercontent.com/test1883/walley/main/build/contracts/contracts/Wallet.sol/Wallet.json"
// ).body;

// State.init({
//   contract: undefined,
//   chainId: undefined,
// });
const sender = "0xf0db85e02dbc2d2c9b86dfc245cd9c2caf9a901b";
if (state.balance === undefined && sender) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// if (
//   state.chainId === undefined &&
//   ethers !== undefined &&
//   Ethers.send("eth_requestAccounts", [])[0]
// ) {
//   Ethers.provider()
//     .getNetwork()
//     .then((chainIdData) => {
//       if (chainIdData?.chainId) {
//         State.update({ chainId: chainIdData.chainId });
//       }
//     });
//   console.log("here");
// } else {
//   console.log("hehe");
// }
// if (state.chainId !== undefined && state.chainId !== 11155111) {
//   return <p>Switch to Ethereum Sepolia</p>;
// }

// const createEthereumContract = () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const walletContract = new ethers.Contract(
//     contractAddress,
//     contractABI,
//     signer
//   );

//   return walletContract;
// };

// if (state.contract === undefined) {
//   createEthereumContract().then((walletContract) => {
//     State.update({
//       contract: walletContract,
//     });
//   });
// }
return (
  <>
    <p>{"h"}</p>
  </>
);
