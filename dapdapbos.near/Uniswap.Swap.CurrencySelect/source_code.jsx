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
  width: 460px;
  border-radius: 16px;
  /* border: 1px solid #292429; */

  border: 1px solid #3d363d;

  position: relative;

  background: linear-gradient(0deg, #131313, #131313);
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
  padding: 10px;
  gap: 12px;
  margin: 10px 25px 25px 30px;

  display: flex;
  align-items: center;

  border: 1px solid #303030;

  background: linear-gradient(0deg, #303030, #303030);

  border-radius: 12px;
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
  max-height: calc(80vh - 120px);
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

const { title, tokens, chainIdNotSupport } = props;

State.init({
  tokens: props.tokens || [],
});

const handleSearch = (e) => {
  State.update({
    tokens: e.target.value
      ? props.tokens.filter((token) => {
          console.log(token);
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
      <div className="borderShadow">
        <Content>
          <Header>
            <Title>Select a token</Title>
            <Widget
              src="dapdapbos.near/widget/Uniswap.Swap.CloseIcon"
              props={{ onClose: props.onClose }}
            />
          </Header>
          <InputWarpper>
            {SearchIcon}
            <Input
              placeholder="Search name or paste address"
              onChange={handleSearch}
            />
          </InputWarpper>
          <CurrencyList>
            {state.tokens?.map((currency) => (
              <Widget
                src="dapdapbos.near/widget/Uniswap.Swap.CurrencyRow"
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
            {(!state.tokens || !state.tokens.length) && (
              <Empty>No token.</Empty>
            )}
          </CurrencyList>
        </Content>
      </div>
    </Overlay>
  </Dialog>
);
