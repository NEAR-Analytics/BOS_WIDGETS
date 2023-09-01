State.init({
  accountBalance: 0,
});

let account = Ethers.send("eth_requestAccounts", [])[0];
if (!account) return "Please connect wallet first";

const res = Ethers.send("wallet_switchEthereumChain", [{ chainId: "0x144" }]);

Ethers.provider()
  .getBalance(account)
  .then((data) => {
    State.update({
      accountBalance: parseInt(data.toString()) / 1000000000000000000,
    });
  });

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p>
        {"Your zkSync account is:"}
        {account}
      </p>
      <p>
        {" Balance is: "} {state.accountBalance}
      </p>
    </div>
  </>
);
