const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return "Please login first";
/**TO DO: CHECK IF OWNER HAS GAS, take out amount */
const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

const signer = Ethers.provider().getSigner();
const minterABI = fetch(
  "https://raw.githubusercontent.com/GenaDrop/abi/main/abi/SingleNFTMinter.abi.json"
);

if (!minterABI.ok) {
  return "unsuccesful";
}

const nft_minter_address = "0x4836CFA7ff4Cafac18fF038F4Da75f68c254c732";

// const minterContract = new ethers.Contract(
//   nft_minter_address,
//   minterABI,
//   signer
// );

if (!erc20Abi.ok) {
  return "scam";
}
// send to msg.sender
const iface = new ethers.utils.Interface(erc20Abi.body);

// const nft_interface = new ethers.utils.Interface(nft_interface.body);

initState({
  token: "",
  tokenDecimals: "",
  sendTo: "",
  sender,
  senderBalance: "0",
  receiverBalance: "0",
  receiver: "",
  amount: "1", // adding all nft state
  name: "NFT SAMPLE",
  description: "This is a test polygon nft using BOS",
  uri: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic2ywrxzzyyes56rkbaz3mth7phjao3hq6cgfxme6ojtyvdioupmq",
});

const tokens = {
  "Select Token": "",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
};

const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const setSendTo = (sendTo) => {
  const receiver = Ethers.resolveName(sendTo);
  State.update({ sendTo, receiver: receiver ?? "" });
  refreshBalances();
};

const setToken = (token) => {
  State.update({ token });
  getTokenDecimals();
};

const getTokenBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenDecimals = () => {
  const encodedData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((tokenDecimals) => {
      State.update({ tokenDecimals: parseInt(Number(tokenDecimals)) });
      refreshBalances();
    });
};

const refreshBalances = () => {
  getTokenBalance(state.sender).then((value) => {
    State.update({ senderBalance: value });
  });

  getTokenBalance(state.receiver).then((value) => {
    State.update({ receiverBalance: value });
  });
};

const mintNFT = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};

const sendTokens = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};

return (
  <>
    <h3>Mint NFT on Polygon</h3>
    <div class="mb-3">
      <label for="selectToken">Select token</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      >
        {tokensMenuItems}
      </select>
    </div>

    <div class="mb-3">
      <label for="send-to" class="form-label">
        Recepient address
      </label>
      <input
        value={state.sendTo}
        class="form-control"
        id="send-to"
        placeholder="vitalik.eth"
        onChange={(e) => setSendTo(e.target.value)}
      />
      {state.receiver && (
        <div class="text-secondary mt-3">Resolved to {state.receiver}</div>
      )}
      {state.receiverBalance != "0" && (
        <div class="text-secondary mt-3">
          Receiver's balance: {state.receiverBalance}
        </div>
      )}

      {state.senderBalance != "0" && (
        <div class="text-secondary mt-3">
          Sender's balance: {state.senderBalance}
        </div>
      )}
    </div>

    <div class="mb-3">
      <label for="amount" class="form-label">
        Enter the amount
      </label>
      <input
        value={state.amount}
        class="form-control"
        id="amount"
        placeholder=""
        onChange={(e) => State.update({ amount: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Enter Name of NFT</label>
      <input
        value={state.name}
        class="form-control"
        id="name"
        placeholder=""
        onChange={(e) => State.update({ name: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Enter Description of NFT</label>
      <input
        value={state.description}
        class="form-control"
        id="name"
        placeholder=""
        onChange={(e) => State.update({ description: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Enter URI of image</label>
      <input
        value={state.uri}
        class="form-control"
        id="name"
        placeholder=""
        onChange={(e) => State.update({ uri: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <button onClick={sendTokens}>Mint</button>
    </div>
    <div class="mb-3"></div>
  </>
);
