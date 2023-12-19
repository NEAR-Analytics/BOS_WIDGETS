// ================ USER INPUT ==============================
const title = "UniswapV2Router";
const abiUrl =
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json";

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

function handleChange(key, value) {
  State.update({ [key]: value });
}

function buildCall() {
  try {
    const iface = new ethers.utils.Interface(ABI);
    const callData = iface.encodeFunctionData("transfer", [
      state.to,
      ethers.utils.parseUnits(state.amount, state.decimals),
    ]);
    const callPayload = {
      target: state.token.address,
      callData: callData,
    };
    Storage.set(`callPayload:${props.callId}`, callPayload);

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
  token: null,
  to: "",
  amount: "0",
  isOk: false,
});

buildCall();

// ============================ RENDER =======================

return (
  <Container>
    <ContainerContent>
      <TextHeader>{title}</TextHeader>
    </ContainerContent>
    <Divider />
    <ContainerContent>
      <StyledBoxInput>
        <StyleTextTitle>Token</StyleTextTitle>
        <Widget
          src="sainy.near/widget/SelectToken"
          props={{
            onChange: (token) => State.update({ token }),
            chainId: props.chainId,
          }}
        />
      </StyledBoxInput>
      <StyledBoxInput>
        <StyleTextTitle>To</StyleTextTitle>
        <input
          placeholder="Wallet Address"
          style={{ border: "1px solid #E9EBED" }}
          onChange={(e) => handleChange("to", e.target.value)}
        />
      </StyledBoxInput>
      <StyledBoxInput>
        <StyleTextTitle>Amount</StyleTextTitle>
        <input
          placeholder="Amount"
          style={{ border: "1px solid #E9EBED" }}
          onChange={(e) => handleChange("amount", e.target.value)}
        />
      </StyledBoxInput>
      <Widget src="sainy.near/widget/SupercallBase" props={props} />
    </ContainerContent>
  </Container>
);
