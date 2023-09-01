let greeting = "Have a great days2";

console.log(`Failed to switch chain to. Add the chain to wallet`);
Ethers.send("wallet_addEthereumChain", [
  {
    chainId: 0x144,
    chainName: "zkSync Era",
    nativeCurrency: "ETH",
    rpcUrls: ["https://mainnet.era.zksync.io"],
  },
]);

const res = Ethers.send("wallet_switchEthereumChain", [{ chainId: 0x144 }]);

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p>
        {" "}
        {greeting} {"res was "}
        {res}
        {" ."}
      </p>
    </div>
  </>
);
