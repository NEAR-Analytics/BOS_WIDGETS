const authorId = "meta-pool-official.near";
const isSignedIn = props.isSignedIn;
const tokenInputBalance = props.tokenInputBalance;
const tokenInput = props.tokenInput;
const tokenOutputBalance = props.tokenOutputBalance;
const tokenOutput = props.tokenOutput;
const tokenInputUsd = props.tokenInputUsd;
const tokenOutputUsd = props.tokenOutputUsd;
const apy = props.apy;
const inputPlaceholder = props.inputPlaceholder;
const buttonText = props.buttonText;
const state = props.state;
const update = props.update;
const handleInput = props.handleInput;
const onSubmit = props.onSubmit;
const tokenInputIconUrl = props.tokenInputIconUrl;
const tokenOutputIconUrl = props.tokenOutputIconUrl;
const onClickMax = props.onClickMax;

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
      {isSignedIn && (
        <StakeFormTopContainer>
          <StakeFormTopContainerLeft>
            <StakeFormTopContainerLeftContent1>
              <StakeFormTopContainerLeftContent1Container>
                <span>Available to stake</span>
              </StakeFormTopContainerLeftContent1Container>
            </StakeFormTopContainerLeftContent1>
            <StakeFormTopContainerLeftContent2>
              <span>
                {tokenInputBalance ?? (!isSignedIn ? "0" : "...")}&nbsp;
                {tokenInput}
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
              {apy ? apy.toFixed(2) : "..."}%
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
                {tokenOutputBalance ?? (!isSignedIn ? "0" : "...")}
                &nbsp;{tokenOutput}
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
            tokenInputUsd && state.value
              ? (tokenInputUsd * parseFloat(state.value)).toFixed(2)
              : "0",
          placeholder: inputPlaceholder,
          value: state.value,
          onChange: (e) => handleInput(e.target.value),
          onClickMax,
          inputError: state.validation !== "",
          balance: tokenInputBalance ?? "-",
          iconName: tokenInput,
          iconUrl: tokenInputIconUrl,
        }}
      />
      {state.validation !== "" && (
        <div style={{ fontWeight: 600, color: "red" }}>{state.validation}</div>
      )}
      <Widget
        src={`${authorId}/widget/MetaPoolStake.Common.YouWillGet`}
        props={{
          value:
            tokenOutputUsd && state.value && parseFloat(state.value) > 0
              ? (state.value / tokenOutputUsd).toFixed(5)
              : 0,
          iconName: tokenOutput,
          token: tokenInput,
          tokenStake: tokenOutput,
          iconUrl: tokenOutputIconUrl,
        }}
      />
      {isSignedIn ? (
        <Widget
          src={`${authorId}/widget/MetaPoolStake.Common.Button`}
          props={{
            onClick: () => onSubmit(),
            text: buttonText,
          }}
        />
      ) : (
        <ButtonConnectContainer>
          <Web3Connect
            connectLabel="Connect with NEAR wallet"
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
