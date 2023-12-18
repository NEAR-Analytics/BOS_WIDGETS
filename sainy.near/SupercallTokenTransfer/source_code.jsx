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

const ERC20_ABI_URL =
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json";
const ERC20_ABI = fetch(ERC20_ABI_URL).body;

function handleChange(key, value) {
  State.update({ [key]: value });

  if (key === "tokenAddress") {
    try {
      const contract = new ethers.Contract(
        value,
        ERC20_ABI,
        Ethers.provider().getSigner()
      );
      contract.decimals().then((dec) => {
        State.update({ decimals: dec });
      });
    } catch (e) {}
  }
}

function buildCall() {
  try {
    const iface = new ethers.utils.Interface(ERC20_ABI);
    const callData = iface.encodeFunctionData("transfer", [
      state.to,
      ethers.utils.parseUnits(state.amount, state.decimals),
    ]);
    const callPayload = {
      target: state.tokenAddress,
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
  tokenAddress: "",
  to: "",
  amount: "0",
  decimals: 18,
  isOk: false,
});

buildCall();

return (
  <Container>
    <ContainerContent>
      <TextHeader>Transfer</TextHeader>
    </ContainerContent>
    <Divider />
    <ContainerContent>
      <StyledBoxInput>
        <StyleTextTitle>Token</StyleTextTitle>
        <Widget
          src="sainy.near/widget/SelectToken"
          props={{
            onChange: (token) => console.log(token),
          }}
        />
      </StyledBoxInput>
      <StyledBoxInput>
        <StyleTextTitle>To</StyleTextTitle>
        <input
          placeholder="Wallet Address"
          onChange={(e) => handleChange("to", e.target.value)}
        />
      </StyledBoxInput>
      <StyledBoxInput>
        <StyleTextTitle>Amount</StyleTextTitle>
        <input
          placeholder="Amount"
          onChange={(e) => handleChange("amount", e.target.value)}
        />
      </StyledBoxInput>
      <Widget src="sainy.near/widget/SupercallBase" props={props} />
    </ContainerContent>
  </Container>
);
