const provider = new Ethers.providers.JsonRpcProvider(
  "https://rpc.xdaichain.com"
);
const accountAddress = "0x4d35ed3e5b9c1405e12a55614ed1fca9956a7092";

State.init({
  balance: null,
  error: null,
});

async function checkXDaiBalance() {
  try {
    const balance = await provider.getBalance(accountAddress);
    const formattedBalance = ethers.utils.formatEther(balance);
    console.log("xDai Balance:", formattedBalance);
    return formattedBalance;
  } catch (error) {
    console.error("Error retrieving xDai balance:", error);
    throw error;
  }
}

function AccountBalance() {
  checkXDaiBalance()
    .then((result) => {
      State.update({
        balance: result,
      });
    })
    .catch((error) => {
      State.update({
        error: error.message,
      });
    });

  return (
    <div>
      {balance && <p>Account: {balance}</p>}
      {error && <p>Error retrieving balance: {error}</p>}
    </div>
  );
}
