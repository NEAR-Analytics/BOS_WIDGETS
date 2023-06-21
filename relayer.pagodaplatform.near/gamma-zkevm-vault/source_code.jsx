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

const Wrapper = styled.div`
    background: #1d1e1f;
    display: flex;
    flex-direction: column;
    max-width: 320px;
    font-family: 'Inter';
    color: #fff;
    border-radius: 8px;
    overflow: hidden;
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
`;
const Button = styled.button`
    background: #8247E5;
    border-radius: 4px;
    border: none;
    color: #fff;
    padding: 8px 0;
    font-weight: 600;
    font-size: 14px;
`;

const Tab = styled.div`
    display: flex;
    gap: 1px;
`;

const TabItem = styled.div`
    flex:1;
    padding: 16px 24px;
    background: #333;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background: #1d1e1f;
    }
`;
State.init({
  isDeposit: true,
});

// const sender = Ethers.send("eth_requestAccounts", [])[0];
const sender = "0xA000BCE4Ce3d1B3AC63C2E0488Ce76Fbdb9DE764";

const updateBalance = (token) => {
  const { address, symbol } = token;
  const decimals = 18;

  if (symbol === "WETH") {
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

const { token0, token1 } = props.pair;

if (sender)
  [
    { symbol: token0, address: addresses[token0] },
    { symbol: token1, address: addresses[token1] },
  ].map(updateBalance);

console.log(state.balances);

const { isDeposit } = state;

const changeMode = (isDeposit) => {
  State.update({ isDeposit });
};

return (
  <Wrapper>
    <Tab>
      <TabItem onClick={() => changeMode(true)}>Deposit</TabItem>
      <TabItem onClick={() => changeMode(false)}>Withdraw</TabItem>
    </Tab>
    {isDeposit ? (
      <SubWrapper>
        <InputWrapper>
          <span>Amount of {token0}</span>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <span>Amount of {token1}</span>
          <Input />
        </InputWrapper>
        <Button> Deposit </Button>
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
