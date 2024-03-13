const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;

  &.display {
    display: block;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;
const Content = styled.div`
  width: 460px;
  border-radius: 16px;
  border: 1px solid #2c334b;
  background-color: #181a27;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 30px 0px 30px;
`;
const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 14px 30px 6px;
`;
const Input = styled.input`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const CurrencyList = styled.div`
  padding: 0px 30px 20px;
  max-height: calc(60vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    max-height: 50vh;
  }
`;
const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

const { title, tokens, account } = props;

State.init({
  tokens: props.tokens || [],
});

const handleSearch = (e) => {
  State.update({
    tokens: e.target.value
      ? props.tokens.filter((token) => {
          return (
            token.address === e.target.value ||
            token.name.toLowerCase().includes(e.target.value?.toLowerCase()) ||
            token.symbol.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        })
      : props.tokens,
  });
};

return (
  <Dialog className={props.display ? "display" : ""}>
    <Overlay
      onClick={() => {
        props.onClose();
      }}
    >
      <Content
        onClick={(ev) => {
          ev.stopPropagation();
        }}
      >
        <Header>
          <Title>Select a token</Title>
          <Widget
            src="bluebiu.near/widget/Arbitrum.Swap.CloseIcon"
            props={{ onClose: props.onClose }}
          />
        </Header>
        <InputWarpper>
          <Input
            placeholder="Search name or paste address"
            onChange={handleSearch}
          />
        </InputWarpper>
        <CurrencyList>
          {state.tokens?.map((currency) => (
            <Widget
              src="bluebiu.near/widget/Arbitrum.Swap.CurrencyRow"
              props={{
                selectedTokenAddress: props.selectedTokenAddress,
                currency,
                display: props.display,
                account,
                onClick: () => {
                  props.onSelect?.(currency);
                  props.onClose();
                },
              }}
              key={currency.address}
            />
          ))}
          {(!state.tokens || !state.tokens.length) && <Empty>No token.</Empty>}
        </CurrencyList>
      </Content>
    </Overlay>
  </Dialog>
);
