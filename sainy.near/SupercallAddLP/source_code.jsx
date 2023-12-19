// ====================== User inputs =======================

// 1. Call Title
const title = "Add Swap LP";

// 2. Call ABI
const ABI_URL =
  "https://raw.githubusercontent.com/SainyTK/contract-list/main/abis/UniswapV2Router.json";

// 3. Call data (address, function name, args)
const encodeFunctionData = () => {
  const target = state.router;
  const functionName = "addLiquidity";

  const params = {
    tokenA: state.tokenA.address,
    tokenB: state.token1.address,
    amountADesired: state.amount0,
    amountBDesired: state.amount1,
    amountAMin: 0,
    amountBMin: 0,
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
    <CallInput title="Token A">
      <Widget
        src="sainy.near/widget/SelectToken"
        props={{
          chainId: props.chainId,
          onChange: (token) => State.update({ tokenA: token }),
        }}
      />
    </CallInput>
    <CallInput title="Token B">
      <Widget
        src="sainy.near/widget/SelectToken"
        props={{
          chainId: props.chainId,
          onChange: (token) => State.update({ tokenB: token }),
        }}
      />
    </CallInput>
    <CallInput title="Amount A">
      <input
        placeholder="Amount A"
        style={{ border: "1px solid #E9EBED" }}
        onChange={(e) => State.update({ amountADesired: e.target.value })}
      />
    </CallInput>
    <CallInput title="Amount B">
      <input
        placeholder="Amount B"
        style={{ border: "1px solid #E9EBED" }}
        onChange={(e) => State.update({ amountBDesired: e.target.value })}
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
