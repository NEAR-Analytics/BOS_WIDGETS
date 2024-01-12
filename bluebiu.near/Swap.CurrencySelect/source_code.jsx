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

const SearchIcon = (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="6.5" stroke="#8E8E8E" />
    <path
      d="M15.7 14.4C15.9209 14.5657 16.2343 14.5209 16.4 14.3C16.5657 14.0791 16.5209 13.7657 16.3 13.6L15.7 14.4ZM11.7 11.4L15.7 14.4L16.3 13.6L12.3 10.6L11.7 11.4Z"
      fill="#8E8E8E"
    />
  </svg>
);

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.1); */
  /* backdrop-filter: blur(10px); */
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
  width: 320px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
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
  padding: 21px 12px 0px 12px;
`;
const InputWarpper = styled.div`
  height: 36px;
  padding: 10px;
  gap: 5px;
  margin: 10px 12px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #1b1e27;
`;

const Input = styled.input`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  height: 16px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const CurrencyList = styled.div`
  height: calc(60vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    height: 50vh;
  }
`;
const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #fff;
`;
const IconBox = styled.div`
  cursor: pointer;
`;

const { tokens, chainIdNotSupport } = props;

State.init({
  tokens: props.tokens || [],
});

const handleSearch = (e) => {
  State.update({
    searchVal: e.target.value,
    tokens: e.target.value
      ? props.tokens.filter((token) => {
          return (
            token.address === e.target.value ||
            token.name.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        })
      : props.tokens,
  });
};

return (
  <Dialog className={props.display ? "display" : ""}>
    <Overlay>
      <Content>
        <Header>
          <Title>Select a token</Title>
          <Widget
            src="bluebiu.near/widget/Swap.CloseIcon"
            props={{ onClose: props.onClose }}
          />
        </Header>
        <InputWarpper>
          {!state.searchVal && (
            <IconBox>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
              >
                <circle
                  cx="7.01829"
                  cy="7.01829"
                  r="6.01829"
                  stroke="#3D4159"
                  strokeWidth="2"
                />
                <rect
                  x="14.9141"
                  y="9.6499"
                  width="6.141"
                  height="2.63186"
                  rx="1.31593"
                  transform="rotate(30 14.9141 9.6499)"
                  fill="#3D4159"
                />
              </svg>
            </IconBox>
          )}
          <Input
            placeholder="Search name or paste address"
            onChange={handleSearch}
            value={state.searchVal || ""}
          />
          {state.searchVal && (
            <IconBox
              onClick={() => {
                handleSearch({ e: { target: { value: "" } } });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="12" fill="#303142" />
                <path
                  d="M13.444 12L16.7799 8.66415C17.0307 8.41332 17.0735 8.0494 16.8756 7.85157L16.1482 7.12424C15.9503 6.92632 15.5869 6.96974 15.3356 7.22041L12.0001 10.5561L8.66433 7.22049C8.41349 6.96941 8.04957 6.92632 7.85165 7.12449L7.12431 7.8519C6.92648 8.04949 6.96931 8.4134 7.22048 8.66423L10.5563 12L7.22048 15.336C6.96973 15.5866 6.92631 15.9503 7.12431 16.1482L7.85165 16.8756C8.04957 17.0735 8.41349 17.0306 8.66433 16.7799L12.0003 13.4439L15.3357 16.7794C15.587 17.0307 15.9504 17.0735 16.1483 16.8756L16.8757 16.1482C17.0735 15.9503 17.0307 15.5866 16.78 15.3356L13.444 12Z"
                  fill="#979ABE"
                />
              </svg>
            </IconBox>
          )}
        </InputWarpper>
        <CurrencyList>
          {state.tokens?.map((currency) => (
            <Widget
              src="bluebiu.near/widget/Swap.CurrencyRow"
              props={{
                selectedTokenAddress: props.selectedTokenAddress,
                currency,
                display: props.display,
                chainIdNotSupport,
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
