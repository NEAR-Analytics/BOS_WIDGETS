// ====================== User inputs =======================

// 1. Call Title
const title = "Token transfer";

// 2. Call ABI
const ABI_URL =
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json";

// 3. Call data
const encodeFunctionData = () => {
  const target = state.token.address;
  const functionName = "transfer";
  const args = [
    state.to, // to
    ethers.utils.parseUnits(state.amount, state.token.decimals), // amount
  ];

  return {
    target,
    functionName,
    args,
  };
};

// 4. Call interface
const renderInputs = () => (
  <>
    <CallInput title="Token">
      <Widget
        src="sainy.near/widget/SelectToken"
        props={{
          chainId: props.chainId,
          onChange: (token) => State.update({ token }),
        }}
      />
    </CallInput>
    <CallInput title="To">
      <input
        placeholder="Wallet Address"
        style={{ border: "1px solid #E9EBED" }}
        onChange={(e) => State.update({ to: e.target.value })}
      />
    </CallInput>
    <CallInput title="Amount">
      <input
        placeholder="Amount"
        style={{ border: "1px solid #E9EBED" }}
        onChange={(e) => State.update({ amount: e.target.value })}
      />
    </CallInput>
  </>
);

// ============== Unchangeable area ====================

const Container = styled.div`
  border-radius: 14px;
  border: 1px solid #e9ebed;
  width: 328px;
  background-color: white;
`;

const ContainerContent = styled.div`
  padding: 18px 22px;
`;

const TextHeader = styled.span`
  color: var(--Text-Primary-Text, #262930);
  /* p-ui-semibold */
  font-family: Mona Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

const Divider = styled.div`
  height: 1px;
  padding: 0;
  background: #e5e7eb;
`;

const StyleTextTitle = styled.span`
  color: var(--Text-Secondary-Text, #656973);

  /* body */
  font-family: Mona Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const StyledBoxInput = styled.div`
  margin-bottom: 10px;
`;

const ABI = fetch(ABI_URL).body;

function buildCall() {
  try {
    const iface = new ethers.utils.Interface(ABI);
    const data = encodeFunctionData();
    const callData = iface.encodeFunctionData(data.functionName, data.args);
    const callPayload = {
      target: data.target,
      callData: callData,
    };
    Storage.set(`callPayload:${props.callId}`, callPayload);
  } catch (e) {}
}

buildCall();

const CallInput = (props) => (
  <StyledBoxInput>
    <StyleTextTitle>{props.title}</StyleTextTitle>
    {props.children}
  </StyledBoxInput>
);

return (
  <Container>
    <ContainerContent>
      <TextHeader>{title}</TextHeader>
    </ContainerContent>
    <Divider />
    <ContainerContent>
      {renderInputs()}
      <Widget src="sainy.near/widget/SupercallBase" props={props} />
    </ContainerContent>
  </Container>
);

// ============== Unchangeable area ====================
