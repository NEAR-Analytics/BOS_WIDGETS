const sender = props.sender;
const message = props.message || `Balance is: `;
const unit = props.unit || `ETH`;

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

if (state.balance === undefined && sender) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

return (
  <span>
    {message}
    {state.balance} {unit}
  </span>
);
