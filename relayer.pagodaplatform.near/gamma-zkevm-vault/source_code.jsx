const addresses = {
  Chef: "0x1e2d8f84605d32a2cbf302e30bfd2387badf35dd",
  DAI: "0xc5015b9d9161dca7e18e32f6f25c4ad850731fd4",
  MATIC: "0xa2036f0538221a77a3937f1379699f44945018d0",
  "N MATIC-USDC": "0x19f4ebc0a1744b93a355c2320899276ae7f79ee5",
  "N USDC-WBTC": "0x9783c45564232c0aff8dc550a9c247c42e8c8b98",
  "N WETH-MATIC": "0x2f39293c9ed046822c014143fb18d5ae0479be93",
  "N WETH-USDC": "0x04c6b11e1ffe1f1032bd62adb343c9d07767489c",
  "N WETH-WBTC": "0x1cc4ee0cb063e9db36e51f5d67218ff1f8dbfa0f",
  USDC: "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
  "USDC-DAI": "0xafad6e114cfbc8a19e91b8d7d04da740a7698595",
  USDT: "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
  "USDT-DAI": "0xcd36b8a47a072e3e05e894b6ec89d294bec3d3ed",
  "USDT-USDC": "0x145d55ae4848f9782efcac785a655e3e5dce1bcd",
  "W MATIC-USDC": "0x8462e4173d63f8769f94bf7ae5bc1ac7ab5d96e3",
  "W USDC-WBTC": "0x83de646a7125ac04950fea7e322481d4be66c71d",
  "W WETH-MATIC": "0x5ada298913d53aa823824de69b4a6e790aed9327",
  "W WETH-USDC": "0xfb3a24c0f289e695ceb87b32fc18a2b8bd896167",
  "W WETH-WBTC": "0x64e78e990b2a45fad8b64b43e62a67d69a156042",
  WBTC: "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1",
  WETH: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
  stMATIC: "0x83b874c1e09d316059d929da402dcb1a98e92082",
  "stMATIC-MATIC": "0x9616052273a598bc04bd1ad7f7a753157c24f77e",
};
const proxyAddress = "0x66cd859053c458688044d816117d5bdf42a56813";

const defaultPair = {
  id: "W WETH-USDC",
  token0: "WETH",
  token1: "USDC",
  decimals0: 18,
  decimals1: 6,
};

const Wrapper = styled.div`
    background: #1d1e1f;
    display: flex;
    flex-direction: column;
    max-width: 320px;
    font-family: 'Inter';
    color: #fff;
    border-radius: 8px;
    overflow: hidden;

    input[type='number']::-webkit-outer-spin-button, input[type='number']::-webkit-inner-spin-button, input[type='number'] {
      -webkit-appearance: none;
      margin: 0;
      -moz-appearance: textfield !important;
    }
`;
const SubWrapper = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
`;
const InputWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 4px;
    span {
        font-size: 12px;
    }
`;
const Input = styled.input`
    border: none;
    background: #333;
    outline: none;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
`;
const Button = styled.button`
    background: #8247E5;
    border-radius: 4px;
    border: none;
    color: #fff;
    padding: 8px 0;
    font-weight: 600;
    font-size: 14px;
    position: relative;
    &:disabled {
      background: #333;
      color: #ccc;
    }
`;
const Tab = styled.div`
    display: flex;
    gap: 1px;
`;
const TabItem = styled.div`
    flex: 1;
    padding: 16px 24px;
    font-size: 14px;
    cursor: pointer;
    background: ${(props) => (props.isActive ? "#1d1e1f" : "#333")};

    &:hover {
        background: #1d1e1f;
    }    
`;
const MaxButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  color: #fff;
  padding: 8px;
  font-size: 14px;
  right: 0;
  bottom: 28%;
`;

const Spinner = styled.i`
  position: absolute;
  top: 50%;
  left: 15px;
  margin: calc(24px * -0.5) auto 0;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 24px;
  animation: spin 800ms infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

State.init({
  isDeposit: true,
  balances: [],
  amount0: 0,
  amount1: 0,
  isComputing: false,
});

const getFromDepositAmount = (depositAmount, tokenDecimal) => {
  let a = new Big(depositAmount[0].toString());
  let b = new Big(depositAmount[1].toString());

  if (a.eq(0) && b.eq(0)) return "0";

  let diff;
  let midpoint;
  if (a.gt(b)) {
    diff = a.minus(b);
    midpoint = diff.div(new Big(2)).plus(b);
  } else {
    diff = b.minus(a);
    midpoint = diff.div(new Big(2)).plus(a);
  }

  for (let i = tokenDecimal; i > 0; i--) {
    const midpointFixed = midpoint
      .div(new Big(10).pow(tokenDecimal))
      .toFixed(i);
    if (
      a.div(new Big(10).pow(tokenDecimal)).lte(midpointFixed) &&
      b.div(new Big(10).pow(tokenDecimal)).gte(midpointFixed)
    ) {
      return midpointFixed;
    }
  }

  return "0";
};

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const updateBalance = (token) => {
  const { address, decimals, symbol } = token;

  if (symbol === "ETH") {
    Ethers.provider()
      .getBalance(sender)
      .then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        State.update({
          balances: {
            ...state.balances,
            [symbol]: adjustedBalance,
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
          [symbol]: adjustedBalance,
        },
      });
    });
  }
};

const { token0, token1, decimals0, decimals1, id } = props.pair || defaultPair;
const hypeAddress = addresses[id];

if (sender)
  [
    { symbol: token0, address: addresses[token0], decimals: decimals0 },
    { symbol: token1, address: addresses[token1], decimals: decimals1 },
  ].map(updateBalance);

const { isDeposit, balances, amount0, amount1, isComputing } = state;

const changeMode = (isDeposit) => {
  State.update({ isDeposit });
};

const handleMax = (isToken0) => {
  if (isToken0) handleToken0Change(balances[token0]);
  else handleToken1Change(balances[token1]);
};

const handleToken0Change = (amount) => {
  State.update({ amount0: amount });

  if (Number(amount) === 0) {
    State.update({ amount1: 0 });
    return;
  }

  State.update({ isComputing: true });

  const token0Wei = ethers.utils.parseUnits(amount, decimals0).toString();

  const proxyAbi = [
    "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
  ];
  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider()
  );

  proxyContract
    .getDepositAmount(hypeAddress, addresses[token0], token0Wei)
    .then((depositAmount) => {
      const amount1 = getFromDepositAmount(depositAmount, decimals1);
      State.update({ amount1 });
      State.update({ isComputing: false });
    });
};

const handleToken1Change = (amount) => {
  State.update({ amount1: amount });

  if (Number(amount) === 0) {
    State.update({ amount0: 0 });
    return;
  }

  State.update({ isComputing: true });
  const token1Wei = ethers.utils.parseUnits(amount, decimals1).toString();

  const proxyAbi = [
    "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
  ];
  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider()
  );

  proxyContract
    .getDepositAmount(hypeAddress, addresses[token1], token1Wei)
    .then((depositAmount) => {
      const amount0 = getFromDepositAmount(depositAmount, decimals0);
      State.update({ amount0 });
      State.update({ isComputing: false });
    });
};

const isInSufficient =
  Number(amount0) > Number(balances[token0]) ||
  Number(amount1) > Number(balances[token1]);

return (
  <Wrapper>
    <Tab>
      <TabItem isActive={isDeposit} onClick={() => changeMode(true)}>
        Deposit
      </TabItem>
      <TabItem isActive={!isDeposit} onClick={() => changeMode(false)}>
        Withdraw
      </TabItem>
    </Tab>
    {isDeposit ? (
      <SubWrapper>
        <InputWrapper>
          <span>Amount of {token0}</span>
          <Input
            value={amount0}
            type="number"
            onChange={(e) => handleToken0Change(e.target.value)}
          />
          <MaxButton onClick={() => handleMax(true)}>Max</MaxButton>
          <span>Balance: {balances[token0]}</span>
        </InputWrapper>
        <InputWrapper>
          <span>Amount of {token1}</span>
          <Input
            value={amount1}
            type="number"
            onChange={(e) => handleToken1Change(e.target.value)}
          />
          <MaxButton onClick={() => handleMax(false)}>Max</MaxButton>
          <span>Balance: {balances[token1]}</span>
        </InputWrapper>
        <Button disabled={isInSufficient || isComputing}>
          {isComputing ? (
            <>
              <Spinner className="ph-bold ph-circle-notch" /> Computing Deposit
              Amount{" "}
            </>
          ) : (
            <>{isInSufficient ? "InSufficient Balance" : "Deposit"}</>
          )}
        </Button>
      </SubWrapper>
    ) : (
      <SubWrapper>
        <InputWrapper>
          <span>
            Amount of {token0}-{token1}
          </span>
          <Input />
        </InputWrapper>
        <Button> Withdraw </Button>
      </SubWrapper>
    )}
  </Wrapper>
);
