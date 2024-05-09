const Container = styled.div`
  border-radius: 14px;
  border: 1px solid #e9ebed;
  width: 328px;
  background:white;
`;

const ContainerContent = styled.div`
  padding: 18px 22px;
`;

const ContainerContentHeader = styled.div`
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

const StyleTextTitle = styled.span`
  color: var(--Text-Secondary-Text, #656973);

  /* body */
  font-family: Mona Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const Divider = styled.div`
  height: 1px;
  padding: 0;
  background: #e5e7eb;
`;

const StyledBoxInput = styled.div`
  margin-bottom: 10px;
`;

const StyledAddButton = styled.button`
  width: 78px;
  height: 32px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #dde1e8;
  background-color: #fff4;
  background: var(#fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  align-items: center;
`;

const StyledAddText = styled.span`
  color: var(#262930);

  /* subtle-semibold */
  font-family: Mona Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
`;

initState({
  functionName: "",
  //   if props.typeFunction is null default set to transfer
  typeFunction: typeFunc ?? "transfer",
  inputToken: "",
  outputToken: "",
  toWalletAddress: "",
  amount: "",
  functionList: [],
});

const renderFunction = () => {
  return (
    <>
      <ContainerContentHeader>
        <TextHeader>Borrow</TextHeader>
      </ContainerContentHeader>
      <Divider />
      <ContainerContent>
        <StyledBoxInput>
          <StyleTextTitle>Token</StyleTextTitle>
          <Widget src="nt-sorravit.near/widget/SupercallSelectToken" />
        </StyledBoxInput>
        <StyledBoxInput>
          <StyleTextTitle>Amount</StyleTextTitle>
          <input
            class="form-control mt-2"
            type="number"
            placeholder="Amount"
            onChange={(e) => {
              State.update({ amount: e.target.value });
            }}
          />
        </StyledBoxInput>
      </ContainerContent>
      <Widget src="sainy.near/widget/SupercallBase" props={props} />
    </>
  );
};

return <Container>{renderFunction()}</Container>;
