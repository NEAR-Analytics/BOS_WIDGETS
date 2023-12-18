function getSigner() {
  return Ethers.provider().getSigner();
}

const ethereum = Ethers.provider();
const operationChainId = 25925;

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
                chainName: "Bitkub Chain - Testnet",
                nativeCurrency: {
                  name: "tKUB",
                  symbol: "tKUB",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc-testnet.bitkubchain.io"],
                blockExplorerUrls: ["https://testnet.bkcscan.com "],
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
    <Web3Connect
      className="Button-primary p-2"
      connectLabel={"Link Wallet"}
      disconnectLabel={"Unlink Wallet"}
    />
  </div>
);
