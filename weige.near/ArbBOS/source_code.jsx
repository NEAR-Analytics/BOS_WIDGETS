const tokens = [
  {
    addressL2: "0x0000000000000000000000000000000000000000",
    addressL1: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    description: "native",
    icon: "https://ipfs.near.social/ipfs/bafkreidgsseicw5dmbvqyot4rf2vp3nr2xetonjl5473j7mdoovagcjtlq",
  },
  {
    addressL2: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    addressL1: "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1",
    decimals: 18,
    symbol: "ARB",
    name: "Arbitrum",
    icon: "https://ipfs.near.social/ipfs/bafkreid7njdklgdliaqs57sth2ixfrxpss6xe5vjprcgcp6rwqcb4zl3me",
  },
  {
    addressL2: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    addressL1: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6,
    symbol: "USDC.e",
    name: "Bridged USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreibap4eeutlrps4izfkm523w4j33ohdeg656ffn3j6oplfhd3ev5te",
  },
  {
    addressL2: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    addressL1: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i",
  },
  {
    addressL2: "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8",
    addressL1: "0x6b175474e89094c44da98b954eedeac495271d0f",
    decimals: 18,
    symbol: "PENDLE",
    name: "Pendle",
    icon: "https://ipfs.near.social/ipfs/bafkreigmom3zubq5otiuafmhrkg444q4higxd2oaa7ykq4zteyfqah5tz4",
  },

  {
    addressL2: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    addressL1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },
  {
    addressL2: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    addressL1: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },

  {
    addressL2: "0x13ad51ed4f1b7e9dc168d8a00cb3f4ddd85efa60",
    addressL1: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
    decimals: 18,
    symbol: "LDO",
    name: "Lido DAO Token",
    icon: "https://ipfs.near.social/ipfs/bafkreicxqxlsum25dqpcz4ffvwgcyr7dqropovpziyalnlbmf7dvicj5rm",
  },
];

const ETH = {
  addressL2: "0x0000000000000000000000000000000000000000",
  addressL1: "0x0000000000000000000000000000000000000000",
  decimals: 18,
  symbol: "ETH",
  name: "Ether",
  description: "native",
  icon: "https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/simple/55ac44e4-bb2e-4637-92d8-3031b672670a.svg",
};

const chains = {
  l2: {
    id: 42161,
    name: "Arbitrum One",
  },
  l1: {
    id: 1,
    name: "Ethereum",
  },
};

State.init({
  inputToken: ETH,
  amount: "",
  balance: "",
});

const config = {
  tokens: tokens,
  eth: ETH,
  chains,
  bridges: {
    l1GatewayRouter: "0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef",
    l2GatewayRouter: "0x5288c571Fd7aD117beA99bF60FE0846C4E84F933",
    l1ERC20Gateway: "0xa3A7B6F88361F48403514059F1F16C8E78d60EeC",
    l2ERC20Gateway: "0x09e9222E96E7B4AE2a407B98d48e330053351EEe",
    l1CustomGateway: "0xcEe284F754E854890e311e3280b767F80797180d",
    l2CustomGateway: "0x096760F208390250649E3e8763348E783AEF5562",
    l1WethGateway: "0xd92023E9d9911199a6711321D1277285e6d4e2db",
    l2WethGateway: "0x6c411aD3E74De3E7Bd422b94A27770f5B86C623B",
    l2Weth: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    l1Weth: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    l1ProxyAdmin: "0x9aD46fac0Cf7f790E5be05A0F15223935A0c0aDa",
    l2ProxyAdmin: "0xd570aCE65C43af47101fC6250FD6fC63D1c22a86",
    l1MultiCall: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    l2Multicall: "0x842eC2c7D803033Edf55E478F461FC547Bc54EB2",
  },
  ethBridges: {
    bridge: "0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a",
    inbox: "0x4Dbd4fc535Ac27206064B68FfCf827b0A60BAB3f",
    sequencerInbox: "0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6",
    outbox: "0x0B9857ae2D4A3DBe74ffE1d7DF045bb7F96E4840",
    rollup: "0x5eF0D09d1E6204141B4d37530808eD19f60FBa35",
    arb_sys: "0x0000000000000000000000000000000000000064",
    classicOutboxes: {
      "0x667e23ABd27E623c11d4CC00ca3EC4d0bD63337a": 0,
      "0x760723CD2e632826c38Fef8CD438A4CC7E7E1A40": 30,
    },

    nodeInterface: "0x00000000000000000000000000000000000000C8",
  },
};

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId, sender });
    })
    .catch((e) => {
      console.error(e.message);
    });
}

const NetworkTitle = (
  <div className="flex-row-center-between network-title">
    <div
      className={`network-filed ${
        state.chainId === chains.l1.id ? "bold selected" : ""
      }`}
      onClick={() => {
        Ethers.send("wallet_switchEthereumChain", [
          { chainId: `0x${Number(chains.l1.id).toString(16)}` },
        ]);
      }}
    >
      <img
        src="https://ipfs.near.social/ipfs/bafkreiepixgqwndkrqhyd5mqsvnqkq6zn2ar4a6ikftiksxnntkjrlajl4"
        width="32"
        style={{
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "100%",
        }}
      ></img>

      <div>Ethereum</div>
    </div>

    <div
      className={`network-filed ${
        state.chainId === chains.l2.id ? "bold selected" : ""
      }`}
      onClick={() => {
        Ethers.send("wallet_switchEthereumChain", [
          { chainId: `0x${Number(chains.l2.id).toString(16)}` },
        ]);
      }}
    >
      <img
        src="https://ipfs.near.social/ipfs/bafkreihepr7vxfstwedrlyx54kffqcnzs2mzebcrdtorrcv3tmm4vevacq"
        width={"32"}
        style={{
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "100%",
        }}
      ></img>

      <div>Arbitrum One</div>
    </div>
  </div>
);

const Layout = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 700px;

  .title {
    font-weight: 700px;
    font-size: 24px;
    padding-bottom: 20px;
  }

  .bold {
    font-weight: 600;
    font-size: 20px;
  }
  .network-title {
    display: flex;
    align-items: center;
    gap: 32px;
    padding-bottom: 40px;
  }

  .network-filed {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 6px;

    cursor: pointer;

    :hover {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;

  border-radius: 16px;

  border: 1px solid black;

  align-items: center;
  margin: auto;
  gap: 12px;
  width: 700px;
  color: black;

  .selected {
    border: 1px solid black;
    border-radius: 10px;
    padding: 6px;
  }

  h5 {
    opacity: 0.5;
  }

  .flex-row-center {
    display: flex;
    align-items: center;
  }

  .flex-row-center-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-row-center-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .balance-filed {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 12px;
  padding: 8px;
`;

const TokenFiled = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  .icon {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: 1px solid black;
  }
`;

const Seperator = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  opacity: 0.8;
  margin: 12px 0px;
`;

const PannelWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  gap: 18px;
`;

if (!state.sender) {
  return (
    <Layout>
      <div className="title">Arbitrum Bridge on BOS</div>

      <Web3Connect className="connect-button" connectLabel="Connect Wallet" />
    </Layout>
  );
}

if (state.chainId !== chains.l1.id && state.chainId !== chains.l2.id) {
  return (
    <Layout>
      <div className="title">Arbitrum Bridge on BOS</div>

      {NetworkTitle}
    </Layout>
  );
}

return (
  <Layout>
    <div className="title">Arbitrum Bridge on BOS</div>
    {NetworkTitle}

    <Wrapper>
      <PannelWrapper>
        <div className="bold"> Pending Withdraws </div>
        <Widget
          src="weige.near/widget/PendingList"
          props={{
            config,
            sender: state.sender,
            chainId: state.chainId,
          }}
        />
      </PannelWrapper>

      <Seperator />

      <PannelWrapper>
        <div className="bold"> Transfer Panel </div>

        <InputWrapper>
          <Input
            value={state.amount}
            onChange={(e) => {
              const targetValue = e.target.value;
              if (targetValue !== "" && !targetValue.match(/^\d*(\.\d*)?$/)) {
                return;
              }
              const amount = targetValue.replace(/^0+/, "0"); // remove prefix 0
              State.update({
                amount,
              });
            }}
            placeholder="bridge amount..."
          />

          <TokenFiled
            onClick={() =>
              State.update({
                showList: true,
              })
            }
          >
            <img src={state.inputToken.icon} className="icon" alt="" />

            <div>{state.inputToken.symbol}</div>

            <div>▽</div>
          </TokenFiled>
        </InputWrapper>

        <div className="flex-row-center-between">
          <span>Balance:</span>

          <span
            className="balance-filed"
            onClick={() =>
              State.update({
                amount: state.balance,
              })
            }
          >
            {state.balance}
          </span>
        </div>
      </PannelWrapper>

      {state.showList && (
        <Widget
          src="weige.near/widget/TokenList"
          props={{
            ...props,
            ...state,
            tokens: tokens,
            config,
            sender: state.sender,
            onClose: () => State.update({ showList: false }),
            onSelectToken: (token) =>
              State.update({ inputToken: token, showList: false }),
          }}
        />
      )}

      <Widget
        src="weige.near/widget/get-balance"
        props={{
          ...state,
          config,
          address:
            state.chainId === chains.l1.id
              ? state.inputToken.addressL1
              : state.inputToken.addressL2,
          onLoad: ({ balance }) => State.update({ balance }),
        }}
      />

      <Widget
        src="weige.near/widget/TransferButton"
        props={{
          ...props,
          ...state,
          callback: () => State.update({ reload: !state.reload }),
          config,
        }}
      />

      <Widget
        src="weige.near/widget/get-l1-token-gateway"
        props={{
          inputToken: state.inputToken,
          config,
          onLoad: (address) =>
            State.update({
              l1TokenGateway: address,
            }),
        }}
      />
    </Wrapper>
  </Layout>
);
