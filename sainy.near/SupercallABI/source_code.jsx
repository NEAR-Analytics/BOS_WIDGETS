// ================ USER INPUT ==============================
const title = props.title;
const abiUrl = props.abiUrl;
const callId = props.callId;

// ================= STYLE ================================

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

// ======================================================

const ABI = fetch(abiUrl).body;

function parseFunctions(abiStr) {
  try {
    const abi = JSON.parse(abiStr);
    if (Array.isArray(abi)) {
      return abi.filter((item) => item.type === "function");
    }
    return [];
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
}

function getFunctionType(stateMutability) {
  if (["view", "pure"].includes(stateMutability)) {
    return "read";
  } else {
    return "write";
  }
}

function handleChange(key, value) {
  State.update({ [key]: value });
}

function buildCall() {
  try {
    const selectedFunction = functions[state.selectedFunction];
    const iface = new ethers.utils.Interface(ABI);
    const callData = iface.encodeFunctionData(
      selectedFunction.name,
      state.params
    );
    const callPayload = {
      target: state.contractAddress,
      callData: callData,
    };
    Storage.set(`callPayload:${callId}`, callPayload);

    State.update({
      isOk: true,
    });
  } catch (e) {
    State.update({
      isOk: false,
    });
  }
}

State.init({
  contractAddress: "",
  selectedFunction: 0,
  params: [],
  isOk: false,
});

buildCall();
const functions = parseFunctions(ABI);
const selectedFunction = functions[state.selectedFunction];
const inputs = selectedFunction ? selectedFunction.inputs : [];

// ============================ RENDER =======================

return (
  <Container>
    <ContainerContent>
      <TextHeader>{title}</TextHeader>
    </ContainerContent>
    <Divider />
    <ContainerContent>
      <StyledBoxInput>
        <StyleTextTitle>Contract address</StyleTextTitle>
        <input
          placeholder={"Contract address"}
          style={{ border: "1px solid #E9EBED" }}
          onChange={(e) => State.update({ contractAddress: e.target.value })}
        />
      </StyledBoxInput>
      <StyledBoxInput>
        <StyleTextTitle>Select function</StyleTextTitle>
        <Widget
          src="sainy.near/widget/Select"
          props={{
            options: functions.map((fn) => ({
              label: `${fn.name} (${getFunctionType(fn.stateMutability)})`,
              value: fn.name,
            })),
            value: state.selectedFunction,
            onChange: (index) => State.update({ selectedFunction: index }),
          }}
        />
      </StyledBoxInput>
      {inputs.map((input, index) => (
        <StyledBoxInput key={index}>
          <StyleTextTitle>
            {input.name} ({input.type})
          </StyleTextTitle>
          <input
            placeholder={`${input.name} (${input.type})`}
            style={{ border: "1px solid #E9EBED" }}
            onChange={(e) =>
              State.update({
                params: inputs.map((inpt, j) => {
                  if (index === j) return e.target.value;
                  else if ([undefined, null].includes(state.params[j]))
                    return "";
                  else return state.params[j];
                }),
              })
            }
          />
        </StyledBoxInput>
      ))}
      <Widget src="sainy.near/widget/SupercallBase" props={props} />
    </ContainerContent>
  </Container>
);
