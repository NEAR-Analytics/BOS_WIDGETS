const authorId = "meta-pool-official.near";
const tokenDecimals = 24;
const swapAddress = "0x534BACf1126f60EA513F796a3377ff432BE62cf9";
const {
  isSignedIn,
  sender,
  update,
  state,
  handleInputStNear,
  onClickMaxstNear,
  updateData,
} = props;

const swapAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "swapstNEARForwNEAR",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const iface = new ethers.utils.Interface(swapAbi);

const onSubmit = () => {
  const swap = new ethers.Contract(
    swapAddress,
    swapAbi,
    Ethers.provider().getSigner()
  );
  const stNearValue = state.isStNearMaxSelected
    ? state.stNearBalance
    : state.value;

  let amount = ethers.utils.parseUnits(stNearValue, tokenDecimals).toString();

  update({ loading: true });

  swap
    .swapstNEARForwNEAR(amount)
    .then((txResp) => {
      txResp.wait().then((waitResp) => {
        update({
          openModal: true,
          modalTitle: "Success!",
          modalDescription: "Tokens unstaked successfully.",
          loading: false,
          strEther: 0,
          balance: "",
          stakedBalance: "",
        });
        updateData();
      });
    })
    .catch((e) => {
      update({
        loading: false,
        openModal: true,
        modalTitle: "Error!",
        modalDescription:
          "An Error Has Occurred. Please Try Again, And If The Problem Persists, Contact The System Administrator.",
      });
      console.error(e);
    });
  updateData();
};

const StakeContainer = styled.div`
    width: 100%;
    max-width: 600px;
    align-self: center
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
margin-right: 8px;
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
font-size: 16px;
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
font-size: 16px;
line-height: 1.4em;
font-weight: 800;
white-space: nowrap;
text-align: center;
display: block;
`;

const StakeFormTopContainerRight = styled.div`
margin-left: 8px;
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
font-size: 16px;
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

const ButtonConnectContainer = styled.div`
    ${".buttonClass{ width: 100%;  border-radius: 1000px;  font-size: 20px;  font-weight: bold;  padding: 8px 0;  /* transition: all 0.3s ease-in-out;*/display: inline-flex;  align-items: center;  justify-content: center;  user-select: none;  position: relative;  white-space: nowrap;  vertical-align: middle;  line-height: 1.2;  border-radius: 1000px;  font-weight: 400;  min-height: 48px;  text-align: center;  box-sizing: border-box;  padding: 0 24px;  color: rgb(255, 255, 255);  background: rgb(12, 34, 70);  border: 2px solid transparent;  &:disabled { background: rgb(12, 34, 70);    color: white;    cursor: not-allowed } &:hover { border: 4px solid rgb(12, 34, 70);    color:  rgb(12, 34, 70);    background: transparent;    }}"}
  `;

return (
  <StakeContainer>
    <StakeForm>
      {sender && (
        <StakeFormTopContainer>
          <StakeFormTopContainerLeft>
            <StakeFormTopContainerLeftContent1>
              <StakeFormTopContainerLeftContent1Container>
                <span>Available to Unstake</span>
              </StakeFormTopContainerLeftContent1Container>
            </StakeFormTopContainerLeftContent1>
            <StakeFormTopContainerLeftContent2>
              <span>
                {state.stNearBalance
                  ? (
                      Math.trunc(parseFloat(state.stNearBalance) * 100000) /
                      100000
                    ).toFixed(5)
                  : ""}
                stNEAR
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
              {state.metrics
                ? state.metrics?.st_near_30_day_apy.toFixed(2)
                : "..."}
              %
            </StakeFormTopContainerCenterContent2>
          </StakeFormTopContainerCenter>

          <StakeFormTopContainerRight>
            <StakeFormTopContainerRightContent1>
              <StakeFormTopContainerRightContent1Container>
                <span>wNEAR available amount</span>
              </StakeFormTopContainerRightContent1Container>
            </StakeFormTopContainerRightContent1>
            <StakeFormTopContainerRightContent2>
              <span>
                {state.wNearBalance}
                wNEAR
              </span>
            </StakeFormTopContainerRightContent2>
          </StakeFormTopContainerRight>
        </StakeFormTopContainer>
      )}
    </StakeForm>
    <StakeFormWrapper>
      <Widget
        src={`${authorId}/widget/MetaPoolStake.Common.Input`}
        props={{
          usdPrice:
            state.nearUsdPrice && state.value
              ? (state.nearUsdPrice * parseFloat(state.value)).toFixed(2)
              : "0",
          placeholder: "Enter stNEAR amount",
          value: state.value,
          onChange: (e) => handleInputStNear(e.target.value),
          onClickMax: onClickMaxstNear,
          inputError: state.validation !== "",
          balance: state.stNearBalance ?? "-",
          iconName: "stNEAR",
          iconUrl:
            "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
        }}
      />
      {state.validation !== "" && (
        <div style={{ fontWeight: 600, color: "red" }}>{state.validation}</div>
      )}
      <Widget
        src={`${authorId}/widget/MetaPoolStake.Common.YouWillGet`}
        props={{
          value:
            state.metrics && state.value && parseFloat(state.value) > 0
              ? (state.value * state.metrics?.st_near_price).toFixed(5)
              : 0,
          iconName: "wNEAR",
          token: "stNEAR",
          tokenStake: "wNEAR",
          iconUrl:
            "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
        }}
      />

      {!!state.sender ? (
        <Widget
          src={`${authorId}/widget/MetaPoolStake.Common.Button`}
          props={{
            onClick: onSubmit,
            disabled: state.loading,
            text: state.loading ? "Wait..." : "Unstake",
          }}
        />
      ) : (
        <ButtonConnectContainer>
          <Web3Connect
            connectLabel="Connect Web3 wallet"
            className="buttonClass"
          />
        </ButtonConnectContainer>
      )}
    </StakeFormWrapper>
    <Widget
      src={`${authorId}/widget/MetaPoolStake.Common.Popup.Index`}
      props={{
        open: state.openModal,
        title: state.modalTitle,
        description: state.modalDescription,
        onClose: () =>
          update({
            openModal: false,
            modalTitle: "",
            modalDescription: "",
          }),
        authorId,
      }}
    />
  </StakeContainer>
);
