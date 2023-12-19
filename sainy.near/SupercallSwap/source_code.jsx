// ====================== User inputs =======================

// 1. Call Title
const title = "Swap";

// 2. Call ABI
const ABI_URL =
  "https://raw.githubusercontent.com/SainyTK/contract-list/main/abis/UniswapV2Router.json";

// 3. Call data (address, function name, args)
const encodeFunctionData = () => {
  const target = state.router;
  const functionName = "swapExactTokensForTokens";

  const params = {
    amount: state.amount,
    amountOutMin: 0,
    path:
      state.token0 && state.token1
        ? [state.token0.address, state.token1.address]
        : [],
    to: Ethers.send("eth_requestAccounts", [])[0],
    deadline: Math.floor((new Date().valueOf() + 10 * 60) / 100),
  };

  console.log(params);

  return {
    target,
    functionName,
    args: Object.values(params),
  };
};

// 4. Call interface
const renderInputs = () => (
  <>
    <CallInput title="Router address">
      <input
        placeholder="Router address"
        style={{ border: "1px solid #E9EBED" }}
        onChange={(e) => State.update({ router: e.target.value })}
      />
    </CallInput>
    <CallInput title="Input token">
      <Widget
        src="sainy.near/widget/SelectToken"
        props={{
          chainId: props.chainId,
          onChange: (token) => State.update({ token0: token }),
        }}
      />
    </CallInput>
    <CallInput title="Output token">
      <Widget
        src="sainy.near/widget/SelectToken"
        props={{
          chainId: props.chainId,
          onChange: (token) => State.update({ token1: token }),
        }}
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
