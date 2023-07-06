if (state.user === undefined) {
  State.update({ user: Ethers.send("eth_requestAccounts", [])[0] });
}

if (!state.user) return <Web3Connect />;

const XAVA_ADDRESS = "0x64E7AB33C8764a9285cbd48A3b5977c51D2eE645";

const ERC20_ABI = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!ERC20_ABI.ok) {
  return <p>"Loading"</p>;
}

// GET XAVA BALANCE
const tokenIface = new ethers.utils.Interface(ERC20_ABI.body);
const getXavaBalance = () => {
  const encodedData = tokenIface.encodeFunctionData("balanceOf", [state.user]);

  return Ethers.provider()
    .call({
      to: XAVA_ADDRESS,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = tokenIface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(18))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const setXavaBalance = () => {
  getXavaBalance().then((xavaBalance) => {
    console.log(xavaBalance);
    State.update({ xavaBalance });
  });
};

if (state.xavaBalance === undefined && state.user) {
  setXavaBalance();
}

return <div>Hello World {state.xavaBalance} </div>;
