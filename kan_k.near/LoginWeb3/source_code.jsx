function getSigner() {
  return Ethers.provider().getSigner();
}

const ethereum = Ethers.provider();
const operationChainId = 96;

const checkWallet = () => {
  try {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        const chainId = chainIdData.chainId;
        if (chainId !== operationChainId) {
          const res = Ethers.send("wallet_switchEthereumChain", [
            { chainId: `0x${Number(operationChainId).toString(16)}` },
          ]);

          if (res === null) {
            Ethers.send("wallet_addEthereumChain", [
              {
                chainId: `0x${Number(operationChainId).toString(16)}`,
                chainName: "Bitkub Chain Mainnet",
                nativeCurrency: {
                  name: "KUB",
                  symbol: "KUB",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.bitkubchain.io/"],
                blockExplorerUrls: ["https://bkcscan.com/"],
              },
            ]);
          }
        } else {
          console.log("OK on chain");
        }
      });
  } catch (e) {
    console.log("No wallet provider");
  }
};

checkWallet();

return (
  <div>
    <Web3Connect className="Button-primary p-2" />
  </div>
);
