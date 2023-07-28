State.init({
  openModal: false,
  loading: false,
});

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 5) {
  return <p>Switch to Ethereum Goerli</p>;
}

// FETCH STAKING ABI

const stakingAddress = "0x748c905130CC15b92B97084Fd1eEBc2d2419146f";
const tokenDecimals = 18;

const metapoolAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "depositETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const iface = new ethers.utils.Interface(metapoolAbi);

// FETCH ETH METRICS

if (state.metrics === undefined) {
  const resp = fetch("https://eth-metapool.narwallets.com/metrics_json");
  console.log(resp);
  if (!resp) return;
  State.update({ metrics: resp?.body ?? "..." });
}

// FETCH ETH CONTRACT DATA

if (state.contractData === undefined) {
  const resp = fetch("https://eth-metapool.narwallets.com/metrics_front");
  console.log(resp);
  if (!resp) return;
  State.update({ contractData: resp?.body ?? "..." });
}

// FETCH ETH PRICE

if (!state.ethUsdPrice) {
  const resp = fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const ethUsdPrice = resp?.body?.ethereum.usd;
  if (ethUsdPrice && !isNaN(ethUsdPrice)) {
    State.update({ ethUsdPrice: ethUsdPrice });
  }
}

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: stakingAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    stakingAddress,
    metapoolAbi,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  State.update({ loading: true });

  erc20
    .depositETH(state.sender, { value: amount })
    .then((txResp) => {
      txResp
        .wait()
        .then((waitResp) =>
          State.update({ openModal: true, loading: false, strEther: 0 })
        );
    })
    .catch((e) => console.error(e));
};

// DETECT USER

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

// GET USER ETH BALANCE

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// GET USER MPETH BALANCE

if (state.stakedBalance === undefined && state.sender) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 8) +
        "..." +
        state.sender.substring(state.sender.length - 6, state.sender.length);
};

// STYLED COMPONENTS

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin: 0px auto;
  min-width: 380px;
  width: 100%;
  padding: 0px 12px 12px 12px;
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
  background:  linear-gradient( rgb(206, 255, 26) 0%, rgb(206, 255, 26) 40%, rgb(247, 249, 251) 40%, rgb(247, 249, 251) 100%);
`;

const StakeContainer = styled.div`
  width: 100%;
  max-width: 900px;
  align-self: center
`;

const Header = styled.div`
  font-weight: 800;
  font-size: 26px;
  padding: 15px 20px 0 20px;
  margin-bottom: 0.2em;
  line-height: 1.2em;
  text-align: center;
`;

const StakeForm = styled.div`
  background: rgb(12, 34, 70);
  margin-bottom: -20px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-bottom: 52px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.6em;
  border-radius: 20px;
  margin: 0px;
  padding: 12px 26px 32px 26px;
  box-shadow: none;
  color: #fff;    
`;

const StakeFormTopContainer = styled.div`
  margin-top: 0px;
  display: flex;
  margin: 10px 0px;
`;

const StakeFormTopContainerLeft = styled.div`
  margin-right: 18px;
  flex-basis: 50%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.6em;
`;

const StakeFormTopContainerLeftContent1 = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
`;

const StakeFormTopContainerLeftContent1Container = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const StakeFormTopContainerLeftContent2 = styled.div`
  margin-top: 2px;
  font-size: 18px;
  line-height: 1.4em;
  font-weight: 800;
  white-space: nowrap;
  display: block;
`;

const StakeFormTopContainerCenter = styled.div`
  flex-basis: 50%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.6em;
`;

const StakeFormTopContainerCenterContent1 = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const StakeFormTopContainerCenterContent1Container = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const StakeFormTopContainerCenterContent2 = styled.div`
  margin-top: 2px;
  font-size: 18px;
  line-height: 1.4em;
  font-weight: 800;
  white-space: nowrap;
  text-align: center;
  display: block;
`;

const StakeFormTopContainerRight = styled.div`
  margin-left: 18px;
  flex-basis: 50%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.6em;
`;

const StakeFormTopContainerRightContent1 = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-end;
  -webkit-box-align: center;
  align-items: center;
`;

const StakeFormTopContainerRightContent1Container = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const StakeFormTopContainerRightContent1Text = styled.div`
  padding: 0px 6px;
  font-weight: 400;
  font-size: 16px;
  background-color: #0002;
  border: solid 4px #000B;
  border-radius: 14px;
`;

const StakeFormTopContainerRightContent2 = styled.div`
  margin-top: 2px;
  font-size: 18px;
  line-height: 1.4em;
  font-weight: 800;
  white-space: nowrap;
  text-align: end;
  display: block;
`;

const StakeFormWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  border-radius: 16px;
  width: 100%;
  align-items: center;
  div {
    gap: 20px;
  }
  padding: 20px 20px 20px 20px;
  margin-top: -30px;
  border:1px solid rgb(212, 224, 231)
`;

const Spacer = styled.div`
  height: 20px;
`;

return (
  <PageContainer>
    <Header>
      <StakeFormTopContainer>
        <StakeFormTopContainerLeft>
          <StakeFormTopContainerLeftContent1>
            <div style={{ marginTop: "10px" }}>
              <svg
                marginTop="10px"
                width="153"
                height="18"
                viewBox="0 0 153 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83333 17.5L11.6667 11.6667L17.5 17.5L23.3333 11.6667L29.1667 17.5L35 11.6667L23.3333 0L17.5 5.83333L11.6667 0L0 11.6667L5.83333 17.5Z"
                  fill="#0C2246"
                />
                <path
                  d="M43 17.7546H45.752V4.9865L50.9584 17.7546H53.3632L58.5696 4.9865V17.7546H61.3216V0.399902H57.7019L52.2476 14.0605L46.6941 0.399902H43V17.7546Z"
                  fill="#0C2246"
                />
                <path
                  d="M70.2515 17.9033C73.4001 17.9033 75.5323 15.9943 75.9785 13.4903H73.301C72.9291 14.9035 71.739 15.7216 70.1027 15.7216C67.9954 15.7216 66.6318 14.3084 66.5574 12.1515V11.978H76.1273C76.1769 11.6309 76.2017 11.2838 76.2017 10.9615C76.1273 7.2426 73.6728 4.91212 70.0036 4.91212C66.2599 4.91212 63.7559 7.51532 63.7559 11.4325C63.7559 15.3249 66.2599 17.9033 70.2515 17.9033ZM66.6566 10.0194C66.8549 8.20951 68.3177 7.06906 70.0284 7.06906C71.8878 7.06906 73.2018 8.13513 73.4249 10.0194H66.6566Z"
                  fill="#0C2246"
                />
                <path
                  d="M79.1868 14.3084C79.1868 16.6141 80.2281 17.7546 82.6578 17.7546H85.137V15.3993H83.2528C82.2363 15.3993 81.8892 15.0274 81.8892 14.0357V7.41615H84.9883V5.06087H81.8892V1.51556H79.1868V5.06087H76.9803V7.41615H79.1868V14.3084Z"
                  fill="#0C2246"
                />
                <path
                  d="M98.2979 15.4241C97.7525 15.4241 97.4797 15.2505 97.4797 14.6059V9.52351C97.4797 6.52363 95.5459 4.91212 92.1742 4.91212C88.976 4.91212 86.8438 6.44925 86.5711 8.92849H89.1991C89.3974 7.81283 90.4635 7.06906 92.0502 7.06906C93.8105 7.06906 94.827 7.93679 94.827 9.34996V10.1185H91.6287C88.0834 10.1185 86.1992 11.5813 86.1992 14.1845C86.1992 16.5398 88.133 17.9033 90.9098 17.9033C92.9675 17.9033 94.2567 17.0108 95.0997 15.7216C95.0997 16.986 95.6947 17.7546 97.4302 17.7546H98.8433V15.4241H98.2979ZM94.827 12.5482C94.8022 14.5068 93.513 15.8208 91.2816 15.8208C89.8189 15.8208 88.9264 15.077 88.9264 14.0109C88.9264 12.7217 89.8437 12.1019 91.5048 12.1019H94.827V12.5482Z"
                  fill="#0C2246"
                />
                <path
                  d="M106.918 17.7546H109.769V11.4573H113.761C117.38 11.4573 119.76 9.27558 119.76 5.92861C119.76 2.55684 117.38 0.399902 113.761 0.399902H106.918V17.7546ZM113.537 2.87914C115.57 2.87914 116.86 4.04439 116.86 5.92861C116.86 7.78804 115.546 8.97807 113.513 8.97807H109.769V2.87914H113.537Z"
                  fill="#0C2246"
                />
                <path
                  d="M127.075 17.9033C130.943 17.9033 133.546 15.3001 133.546 11.4077C133.546 7.54011 130.943 4.91212 127.075 4.91212C123.207 4.91212 120.604 7.54011 120.604 11.4077C120.604 15.3001 123.207 17.9033 127.075 17.9033ZM127.075 15.6224C124.819 15.6224 123.356 13.8622 123.356 11.4077C123.356 8.95328 124.819 7.19302 127.075 7.19302C129.331 7.19302 130.819 8.95328 130.819 11.4077C130.819 13.8622 129.331 15.6224 127.075 15.6224Z"
                  fill="#0C2246"
                />
                <path
                  d="M141.699 17.9033C145.566 17.9033 148.169 15.3001 148.169 11.4077C148.169 7.54011 145.566 4.91212 141.699 4.91212C137.831 4.91212 135.228 7.54011 135.228 11.4077C135.228 15.3001 137.831 17.9033 141.699 17.9033ZM141.699 15.6224C139.442 15.6224 137.98 13.8622 137.98 11.4077C137.98 8.95328 139.442 7.19302 141.699 7.19302C143.955 7.19302 145.442 8.95328 145.442 11.4077C145.442 13.8622 143.955 15.6224 141.699 15.6224Z"
                  fill="#0C2246"
                />
                <path
                  d="M150.322 17.7546H153V0.399902H150.322V17.7546Z"
                  fill="#0C2246"
                />
              </svg>
            </div>
          </StakeFormTopContainerLeftContent1>
        </StakeFormTopContainerLeft>
        {state.sender && (
          <StakeFormTopContainerRightContent1Text>
            {getSender()}
          </StakeFormTopContainerRightContent1Text>
        )}
      </StakeFormTopContainer>
      <Spacer />
      <Widget src={`rodrigos.near/widget/MetaPoolStakeEth.Title`} />
    </Header>
    <Spacer />
    <StakeContainer>
      <StakeForm>
        {state.sender && (
          <StakeFormTopContainer>
            <StakeFormTopContainerLeft>
              <StakeFormTopContainerLeftContent1>
                <StakeFormTopContainerLeftContent1Container>
                  <span>Available to stake</span>
                </StakeFormTopContainerLeftContent1Container>
              </StakeFormTopContainerLeftContent1>
              <StakeFormTopContainerLeftContent2>
                <span>
                  {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH
                </span>
              </StakeFormTopContainerLeftContent2>
            </StakeFormTopContainerLeft>

            <StakeFormTopContainerCenter>
              <StakeFormTopContainerCenterContent1>
                <StakeFormTopContainerCenterContent1Container>
                  APY
                </StakeFormTopContainerCenterContent1Container>
              </StakeFormTopContainerCenterContent1>
              <StakeFormTopContainerCenterContent2>
                {state.metrics?.mp_eth_30_day_apy
                  ? state.metrics.mp_eth_30_day_apy.toFixed(2)
                  : "..."}
                %
              </StakeFormTopContainerCenterContent2>
            </StakeFormTopContainerCenter>

            <StakeFormTopContainerRight>
              <StakeFormTopContainerRightContent1>
                <StakeFormTopContainerRightContent1Container>
                  <span>Staked amount</span>
                </StakeFormTopContainerRightContent1Container>
              </StakeFormTopContainerRightContent1>
              <StakeFormTopContainerRightContent2>
                <span>
                  {state.stakedBalance ?? (!state.sender ? "0" : "...")}
                  &nbsp;mpETH
                </span>
              </StakeFormTopContainerRightContent2>
            </StakeFormTopContainerRight>
          </StakeFormTopContainer>
        )}
      </StakeForm>
      <StakeFormWrapper>
        <Widget
          src={`rodrigos.near/widget/MetaPoolStakeEth.Input`}
          props={{
            ethUsdPrice:
              state.ethUsdPrice && state.strEther
                ? (state.ethUsdPrice * parseFloat(state.strEther)).toFixed(2)
                : "0",
            placeholder: "Enter ETH amount",
            value: state.strEther,
            onChange: (e) => State.update({ strEther: e.target.value }),
            onClickMax: () => {
              State.update({
                strEther: (state.balance > 0.05
                  ? parseFloat(state.balance) - 0.05
                  : 0
                ).toFixed(2),
              });
            },
            inputError: state.inputError,
            balance: nearBalance,
            iconName: "NEAR",
            iconUrl:
              "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
          }}
        />
        <Widget
          src={`rodrigos.near/widget/MetaPoolStakeEth.YouWillGet`}
          props={{
            value:
              state.strEther && state.metrics
                ? (state.strEther * state.metrics.mpethPrice).toFixed(5)
                : 0,
            price: state.metrics ? state.metrics.mpethPrice : 1,
            iconName: "mpETH",
            iconUrl:
              "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
          }}
        />
        {!!state.sender ? (
          <Widget
            src={`rodrigos.near/widget/MetaPoolStakeEth.Button`}
            props={{
              onClick: () => submitEthers(state.strEther, state.sender),
              disabled: state.loading,
              text: state.loading ? "Wait..." : "Stake ETH",
            }}
          />
        ) : (
          <Web3Connect connectLabel="Connect with Ethereum wallet" />
        )}
      </StakeFormWrapper>
      <Widget
        src={"rodrigos.near/widget/MetaPoolStakeEth.PopUp"}
        props={{
          open: state.openModal,
          onClose: () => State.update({ openModal: false }),
        }}
      />
    </StakeContainer>
  </PageContainer>
);
