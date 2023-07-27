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

// FETCH LIDO ABI

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

// FETCH LIDO STAKING APR

if (state.metrics === undefined) {
  const resp = fetch("https://eth-metapool.narwallets.com/metrics_json");
  console.log(resp);
  if (!resp) return;
  State.update({ metrics: resp?.body ?? "..." });
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
    .catch((waitResp) => State.update({ loading: false }));
};

// DETECT SENDER

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

//if (!state.sender)  return "Please login first";

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined && state.sender) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

// STYLED COMPONENTS

const LidoContainer = styled.div`
  box-sizing: border-box;
  margin: 0px auto;
  min-width: 320px;
  width: 100%;
  padding: 0px 32px 32px 32px;
  max-width: 560px;
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
  background:  linear-gradient( rgb(206, 255, 26) 0%, rgb(206, 255, 26) 40%, rgb(247, 249, 251) 40%, rgb(247, 249, 251) 100%);
`;

const Header = styled.div`
  font-weight: 800;
  font-size: 26px;
  padding-top: 15px;
  margin-bottom: 0.2em;
  line-height: 1.2em;
  text-align: center;
`;

const LidoForm = styled.div`
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
  padding: 12px 32px 32px 32px;
  box-shadow: none;
  color: #fff;    
`;

const LidoFormTopContainer = styled.div`
  margin-top: 0px;
  display: flex;
  margin: 10px 0px;
`;

const LidoFormTopContainerLeft = styled.div`
  margin-right: 18px;
  flex-basis: 50%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.6em;
`;

const LidoFormTopContainerLeftContent1 = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
`;

const LidoFormTopContainerLeftContent1Container = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const LidoFormTopContainerLeftContent1Circle = styled.div`
  background-color: #53BA95;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 8px;
`;

const LidoFormTopContainerLeftContent2 = styled.div`
  margin-top: 2px;
  font-size: 18px;
  line-height: 1.4em;
  font-weight: 800;
  white-space: nowrap;
  display: block;
`;

const LidoFormTopContainerCenter = styled.div`
  flex-basis: 50%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.6em;
`;

const LidoFormTopContainerCenterContent1 = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const LidoFormTopContainerCenterContent1Container = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const LidoFormTopContainerCenterContent2 = styled.div`
  margin-top: 2px;
  font-size: 18px;
  line-height: 1.4em;
  font-weight: 800;
  white-space: nowrap;
  text-align: center;
  display: block;
`;

const LidoFormTopContainerRight = styled.div`
  margin-left: 18px;
  flex-basis: 50%;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.6em;
`;

const LidoFormTopContainerRightContent1 = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-end;
  -webkit-box-align: center;
  align-items: center;
`;

const LidoFormTopContainerRightContent1Container = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const LidoFormTopContainerRightContent2 = styled.div`
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
  <Theme>
    <LidoContainer>
      <Header>
        <div class="LidoFormTopContainerRight">
          <div class="LidoFormTopContainerRightContent1">
            <div class="LidoFormTopContainerRightContent1Text">
              <span>{getSender()}</span>
            </div>
          </div>
        </div>
        <Widget src={`rodrigos.near/widget/MetaPoolStakeEth.Title`} />
      </Header>

      <LidoForm>
        {state.sender && (
          <LidoFormTopContainer>
            <LidoFormTopContainerLeft>
              <LidoFormTopContainerLeftContent1>
                <LidoFormTopContainerLeftContent1Container>
                  <span>Available to stake</span>
                  <LidoFormTopContainerLeftContent1Circle />
                </LidoFormTopContainerLeftContent1Container>
              </LidoFormTopContainerLeftContent1>
              <LidoFormTopContainerLeftContent2>
                <span>
                  {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH
                </span>
              </LidoFormTopContainerLeftContent2>
            </LidoFormTopContainerLeft>

            <LidoFormTopContainerCenter>
              <LidoFormTopContainerCenterContent1>
                <LidoFormTopContainerCenterContent1Container>
                  APY
                </LidoFormTopContainerCenterContent1Container>
              </LidoFormTopContainerCenterContent1>
              <LidoFormTopContainerCenterContent2>
                {state.metrics?.mp_eth_30_day_apy
                  ? state.metrics.mp_eth_30_day_apy.toFixed(2)
                  : "..."}
                %
              </LidoFormTopContainerCenterContent2>
            </LidoFormTopContainerCenter>

            <LidoFormTopContainerRight>
              <LidoFormTopContainerRightContent1>
                <LidoFormTopContainerRightContent1Container>
                  <span>Staked amount</span>
                </LidoFormTopContainerRightContent1Container>
              </LidoFormTopContainerRightContent1>
              <LidoFormTopContainerRightContent2>
                <span>
                  {state.stakedBalance ?? (!state.sender ? "0" : "...")}
                  &nbsp;mpETH
                </span>
              </LidoFormTopContainerRightContent2>
            </LidoFormTopContainerRight>
          </LidoFormTopContainer>
        )}
      </LidoForm>
      {false && (
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                opacity="0.6"
                d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"
              ></path>
              <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
              <path
                opacity="0.6"
                d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"
              ></path>
              <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
              <path
                opacity="0.2"
                d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"
              ></path>
              <path
                opacity="0.6"
                d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"
              ></path>
            </svg>
          </span>
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              disabled={!state.sender}
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strEther}
              onChange={(e) => State.update({ strEther: e.target.value })}
              placeholder="Amount"
            />
          </span>
          <span
            class="LidoStakeFormInputContainerSpan3"
            onClick={() => {
              State.update({
                strEther: (state.balance > 0.05
                  ? parseFloat(state.balance) - 0.05
                  : 0
                ).toFixed(2),
              });
            }}
          >
            <button
              class="LidoStakeFormInputContainerSpan3Content"
              disabled={!state.sender}
            >
              <span class="LidoStakeFormInputContainerSpan3Max">MAX</span>
            </button>
          </span>
        </div>
      )}
      {!!state.sender ? (
        <>
          {false && (
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => submitEthers(state.strEther, state.sender)}
            >
              <span>Submit</span>
            </button>
          )}
          <StakeFormWrapper>
            <Widget
              src={`rodrigos.near/widget/MetaPoolStakeEth.Input`}
              props={{
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
            <Widget
              src={`rodrigos.near/widget/MetaPoolStakeEth.Button`}
              props={{
                onClick: () => submitEthers(state.strEther, state.sender),
                disabled: state.loading,
                text: state.loading ? "Wait..." : "Stake ETH",
              }}
            />
          </StakeFormWrapper>
          <Widget
            src={"rodrigos.near/widget/MetaPoolStakeEth.PopUp"}
            props={{
              open: state.openModal,
              onClose: () => State.update({ openModal: false }),
            }}
          />
        </>
      ) : (
        <Web3Connect
          className="LidoStakeFormSubmitContainer"
          connectLabel="Connect with Web3"
        />
      )}
    </LidoContainer>
  </Theme>
);
