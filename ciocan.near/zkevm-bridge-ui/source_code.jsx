const Layout = styled.div`
  position: relative;
  width: 314px;
  min-height: 412px;
  background-color: #151718;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
  }

  .container-button {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    cursor: pointer;
  }

  .separator {
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 8px;
    margin-right: 8px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    list-style: none;
    padding: 0 8px 0 8px;
    margin: 0;
    display: flex;
    flex-direction: column;
    color: #fff;

    li {
      display: flex;
      justify-content: space-between;
    }

    .value {
      color: #BA90FF;
      font-weight: 600;
    }
  }
`;

const ContainerNetwork = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 16px;

  .label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    color: #fff;
  }
`;

const NetworkSelectorButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 4px;
  gap: 4px;

  height: 24px;
  outline: none;
  border: none;
  position: relative;

  background: #2d2f30;
  border-radius: 12px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #FFFFFF;
`;

const NetworkList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  width: 145px;
  background: #2d2f30;
  z-index: 10;
  box-shadow: inset 0px 0px 0px 1px #999;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 12px;
  }

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 8px 4px 4px;
    gap: 4px;
    flex: 1;
    width: 100%;
    color: #fff;

    &:hover {
      color: #ccc;
    }
  }
`;

const CloseButton = styled.button`
  color: white;
  background: none;
  float: right;
  margin-left: 12px;
`;

const caretSvg = (
  <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
    <path
      d="M4.99998 1L2.99999 3L1 1"
      stroke="white"
      stroke-width="1.21738"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  position: relative;

  width: 100%;

  background: #2d2f30;
  border-radius: 12px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #FFFFFF;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  h3 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    color: rgba(255, 255, 255, 0.6);
  }

  .token-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: flex-end;
    flex: 1;

    .usd-value {
      text-align: right;
    }
  }
`;

const TokenSelector = styled.button`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const Input = styled.input`
  background: none;
  color: #fff;
  text-align: right;
  border: none;
  outline: none;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
`;

const ToNetworkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 4px;
  gap: 4px;

  height: 24px;
  outline: none;
  border: none;
  position: relative;

  background: #2d2f30;
  border-radius: 12px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #FFFFFF;
`;

const ActionButton = styled.button`
  background: #8247E5;
  border-radius: 4px;
  border: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
  padding: 12px;
`;

const Alert = styled.div`
  position: absolute;
  color: red;
  background: #fff;
  z-index: 20;
  padding: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
`;

const Dialog = styled.div`
  position: absolute;
  right: 32px;
  left: 32px;
  top: 25%;
  background: #2d2f30;
  z-index: 10;
  box-shadow: inset 0px 0px 0px 1px #999;
  border-radius: 12px;
  padding: 16px; 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    color: #fff;

    &:hover {
      color: #ccc;
    }
  }

  .token {
    display: flex;
    gap: 8px;
    align-items: center;
  }

`;

const tokens = props.tokens ?? [
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
];

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

const networks = {
  1: "Ethereum Mainnet",
  5: "Ethereum Goerli",
  1101: "Polygon zkEvm",
  1442: "Polygon zkEvm Goerli",
};

const coinsMap = {
  ethereum: "ETH",
  "usd-coin": "USDC",
  "matic-network": "MATIC",
  dai: "DAI",
  uniswap: "UNI",
};

State.init({
  selectedToken: "ETH",
  isNetworkSelectOpen: false,
  isTokenDialogOpen: false,
  amount: 0,
  balances: {},
  prices: {},
  isToastOpen: false,
});

const {
  isNetworkSelectOpen,
  chainId,
  selectedToken,
  isTokenDialogOpen,
  amount,
  balances,
  prices,
} = state;

const selectedNetwork = chainId === 1 || chainId === 5 ? "ethereum" : "polygon";

const isTestnet = chainId === 5 || chainId === 1442;
const isMainnet = chainId === 1 || chainId === 1101;

const walletChains = {
  1442: {
    chainId: `0x5a2`,
    chainName: "zkEVM Testnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.public.zkevm-test.net/"],
    blockExplorerUrls: ["https://testnet-zkevm.polygonscan.com/"],
  },
  1101: {
    chainId: `0x44d`,
    chainName: "zkEVM Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://zkevm-rpc.com"],
    blockExplorerUrls: ["https://zkevm.polygonscan.com/"],
  },
};

const switchNetwork = (chainId) => {
  Ethers.provider()
    .send("wallet_switchEthereumChain", [
      { chainId: `0x${chainId.toString(16)}` },
    ])
    .catch((err) => {
      if (err.code === 4902) {
        Ethers.provider()
          .send("wallet_addEthereumChain", [walletChains[chainId]])
          .then(() => {
            Ethers.provider().send("wallet_switchEthereumChain", [
              { chainId: `0x${chainId.toString(16)}` },
            ]);
          });
      }
    });
};

const coins = Object.keys(coinsMap);
const pricesUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
  ","
)}&vs_currencies=usd`;

if (!prices[selectedToken]) {
  asyncFetch(pricesUrl).then((res) => {
    if (!res.ok) return;
    const prices = {};
    coins.forEach((coin) => (prices[coinsMap[coin]] = res.body[coin].usd));
    State.update({ prices });
  });
}

const updateBalance = (token) => {
  const { address, decimals, symbol } = token;

  // if (state.balances[symbol]) {
  //   return;
  // }

  if (symbol === "ETH") {
    Ethers.provider()
      .getBalance(sender)
      .then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        State.update({
          balances: {
            ...state.balances,
            [symbol]: Number(adjustedBalance).toFixed(4),
          },
        });
      });
  } else {
    const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
    const tokenContract = new ethers.Contract(
      address,
      erc20Abi,
      Ethers.provider()
    );
    tokenContract.balanceOf(sender).then((balanceBig) => {
      const adjustedBalance = ethers.utils.formatUnits(balanceBig, decimals);
      State.update({
        balances: {
          ...state.balances,
          [symbol]: Number(Number(adjustedBalance).toFixed(4)),
        },
      });
    });
  }
};

tokens.filter((t) => t.chainId === chainId).map(updateBalance);

const changeNetwork = (network) => {
  console.log(network);
  if (isTestnet) {
    if (network === "polygon") {
      switchNetwork(1442);
    } else {
      switchNetwork(5);
    }
  } else {
    if (network === "polygon") {
      switchNetwork(1101);
    } else {
      switchNetwork(1);
    }
  }
  State.update({ isNetworkSelectOpen: false, selectedNetwork: network });
};

const openNetworkList = () => {
  State.update({ isNetworkSelectOpen: true, isTokenDialogOpen: false });
};

const isCorrectNetwork = Object.keys(networks)
  .map((n) => Number(n))
  .includes(chainId);

const getFromNetworkLabel = () => {
  switch (selectedNetwork) {
    case "ethereum":
      return isMainnet ? networks[1] : networks[5];
    case "polygon":
      return isMainnet ? networks[1101] : networks[1442];
    default:
      return "unknown";
  }
};

const getToNetworkLabel = () => {
  switch (selectedNetwork) {
    case "ethereum":
      return isMainnet ? networks[1101] : networks[1442];
    case "polygon":
      return isMainnet ? networks[1] : networks[5];
    default:
      return "unknown";
  }
};

const getToken = (tokenSymbol) =>
  tokens
    .filter(
      (t) =>
        t.chainId ===
        (isMainnet
          ? selectedNetwork === "ethereum"
            ? 1
            : 1101
          : selectedNetwork === "ethereum"
          ? 5
          : 1442)
    )
    .find((t) => t.symbol === tokenSymbol);

const updateToken = (tokenSymbol) => {
  State.update({ selectedToken: tokenSymbol, isTokenDialogOpen: false });

  const { onUpdateToken } = props;
  if (onUpdateToken) {
    const token = getToken(tokenSymbol);
    onUpdateToken({ amount, token, network: selectedNetwork });
  }
};

const openTokenDialog = () => {
  State.update({ isTokenDialogOpen: true });
};

const changeAmount = (e) => {
  const amount = Number(e.target.value);
  State.update({ amount });

  const { onChangeAmount } = props;
  if (onChangeAmount) {
    const token = getToken(selectedToken);
    onChangeAmount({ amount, token, network: selectedNetwork });
  }
};

const onOpenChange = (v) => {
  State.update({
    isToastOpen: false,
  });
};

const handleConfirm = () => {
  console.log(state);
  const isValidAmount = amount > 0 && amount < balances[selectedToken];

  if (!isValidAmount) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid amount",
      description: "Amount should be less than token balance",
    });
    return;
  }

  const isPolygonNetwork = chainId === 1101 || chainId === 1442;
  if (selectedNetwork === "ethereum" && isPolygonNetwork) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid network",
      description: "Please switch to polygon zkevm network",
    });
    return;
  }

  if (selectedNetwork === "polygon" && !isPolygonNetwork) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid network",
      description: "Please switch to ethereum network",
    });
    return;
  }

  const { onConfirm } = props;
  if (onConfirm) {
    const token = getToken(selectedToken);
    onConfirm({ amount, token, network: selectedNetwork });
  }
};

const networkList = isMainnet ? [1, 1101] : [5, 1442];
const token = tokens.find((t) => t.symbol === selectedToken);

const { isToastOpen, variant, title, description } = state;

console.log(state);

return (
  <Layout>
    <div class="container">
      {!isCorrectNetwork && (
        <Alert>Please switch to Ethereum or Polygon zkEVM</Alert>
      )}
      <ContainerNetwork>
        <span class="label">FROM</span>
        <div class="container-button">
          <NetworkSelectorButton onClick={openNetworkList}>
            {selectedNetwork === "ethereum" ? (
              <img
                style={{ width: "16px" }}
                src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
              />
            ) : (
              <img
                style={{ width: "16px" }}
                src="https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"
              />
            )}
            <span>{getFromNetworkLabel()}</span>
            {caretSvg}
          </NetworkSelectorButton>
          {isNetworkSelectOpen && (
            <NetworkList>
              <ul>
                <li onClick={(e) => changeNetwork("ethereum")}>
                  <img
                    style={{ width: "16px" }}
                    src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
                  />
                  <span>{networks[networkList[0]]}</span>
                </li>
                <li onClick={(e) => changeNetwork("polygon")}>
                  <img
                    style={{ width: "16px" }}
                    src="https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"
                  />
                  <span>{networks[networkList[1]]}</span>
                </li>
              </ul>
            </NetworkList>
          )}
        </div>
      </ContainerNetwork>
      <TokenContainer>
        <img style={{ width: "32px" }} src={token?.logoURI} />
        <div class="token-container">
          <h3>SEND -&gt;</h3>
          <TokenSelector disabled={!isCorrectNetwork} onClick={openTokenDialog}>
            <span>{selectedToken}</span>
            {caretSvg}
          </TokenSelector>
        </div>
        <div class="input-container">
          <Input placeholder="0" type="number" onChange={changeAmount} />
          <span class="usd-value">${prices[selectedToken] * amount}</span>
        </div>
      </TokenContainer>
    </div>
    <div class="container">
      <ContainerNetwork>
        <span class="label">TO</span>
        <ToNetworkContainer>
          {selectedNetwork === "polygon" ? (
            <img
              style={{ width: "16px" }}
              src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
            />
          ) : (
            <img
              style={{ width: "16px" }}
              src="https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png"
            />
          )}
          <span>{getToNetworkLabel()}</span>
        </ToNetworkContainer>
      </ContainerNetwork>
      <TokenContainer>
        <img style={{ width: "32px" }} src={token?.logoURI} />
        <div class="token-container">
          <h3>-&gt; RECEIVE</h3>
          <TokenSelector>
            <span>{selectedToken}</span>
          </TokenSelector>
        </div>
        <div class="input-container">
          <Input type="number" readOnly value={amount} />
          <span class="usd-value">${prices[selectedToken] * amount}</span>
        </div>
      </TokenContainer>
    </div>
    <div class="separator" />
    <ul class="info">
      <li>
        <span>Rate</span>
        <span class="value">
          1 {selectedToken} = ${prices[selectedToken]}
        </span>
      </li>
    </ul>
    <ActionButton onClick={handleConfirm} disabled={!isCorrectNetwork}>
      Confirm
    </ActionButton>
    {isTokenDialogOpen && (
      <Dialog>
        <CloseButton onClick={() => State.update({ isTokenDialogOpen: false })}>
          x
        </CloseButton>
        <ul>
          {tokens
            .filter((t) => t.chainId === chainId)
            .map((token) => {
              const { symbol, logoURI } = token;
              return (
                <li key={symbol} onClick={() => updateToken(symbol)}>
                  <div class="token">
                    <img style={{ width: "16px" }} src={logoURI} />
                    <span>{symbol}</span>
                  </div>
                  <span>{state.balances[symbol] ?? "-"}</span>
                </li>
              );
            })}
        </ul>
      </Dialog>
    )}
    <Widget
      src="ciocan.near/widget/toast"
      props={{ open: isToastOpen, variant, title, description, onOpenChange }}
    />
  </Layout>
);
