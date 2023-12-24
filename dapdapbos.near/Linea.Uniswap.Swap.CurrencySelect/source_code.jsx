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
  background-color: rgba(0, 0, 0, 0.5);
  /* backdrop-filter: blur(10px); */
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    align-items: flex-end;
  }
`;

const Content = styled.div`
  width: 516px;
  max-height: 80vh;
  overflow: hidden;
  border-radius: 16px;
  /* border: 1px solid #292429; */
  border: 1px solid #3d363d;
  position: relative;

  background: linear-gradient(0deg, #131313, #131313);
  @media (max-width: 768px) {
    width: 100vw;
    border-radius: 16px 16px 0px 0px;
    background: #2b2b2b;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 30px 0px 30px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const InputWarpper = styled.div`
  height: 46px;
  padding: 10px;
  gap: 12px;
  margin: 10px 25px 10px 30px;
  display: flex;
  align-items: center;
  border: 1px solid #303030;
  background: #1b1b1b;
  border-radius: 12px;
  @media (max-width: 768px) {
    margin: 0px 15px 20px;
  }
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
const ScrollContent = styled.div`
  height: calc(80vh - 120px);
  overflow-y: auto;
`;
const CurrencyList = styled.div`
  padding-bottom: 20px;

  @media (max-width: 768px) {
    padding-bottom: 30px;
  }
`;
const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #fff;
`;
const QuickList = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  padding: 0px 25px 13px;
`;
const QuickItem = styled.div`
  border-radius: 18px;
  border: 1px solid #303030;
  background: #1b1b1b;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0px 20px 0px 7px;
  height: 36px;
  cursor: pointer;
`;
const QuickSymbol = styled.div`
  color: #fff;
  font-family: Noto Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 44px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 12px 30px;
  border-bottom: 1px solid #242424;

  @media (max-width: 768px) {
    border-bottom: 1px solid #343838;
  }
`;
const Tab = styled.div`
  cursor: pointer;
  color: #8e8e8e;
  &.active {
    color: #fff;
  }
`;
const LoadingWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const { chainId, explor, tokens, account, onImport } = props;

State.init({
  tokens: Object.values(props.tokens || {}),
  tab: "All",
});
const handleSearch = () => {
  if (!account) {
    State.update({
      tokens: [],
    });
    return;
  }
  const propsTokens = Object.values(props.tokens || {});
  let tokenIsAvailable = false;
  const _tokens = propsTokens.filter((token) => {
    if (!state.searchVal) {
      return state.tab === "All" ? true : token.isImport;
    }
    if (token.address.toLowerCase() === state.searchVal?.toLowerCase())
      tokenIsAvailable = true;
    return (token.address.toLowerCase() === state.searchVal?.toLowerCase() ||
      token.name.toLowerCase().includes(state.searchVal.toLowerCase())) &&
      state.tab === "All"
      ? true
      : state.tab === "Imported"
      ? token.isImport
      : false;
  });
  if (
    _tokens.length === 0 &&
    ethers.utils.isAddress(state.searchVal) &&
    !tokenIsAvailable
  ) {
    State.update({
      loading: true,
      tokens: [],
    });
  } else {
    State.update({
      tokens: _tokens,
      importToken: null,
      loading: false,
    });
  }
};
const topTokens = props.stableTokens || [];
const TABS = ["All", "Imported"];

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
              onChange={(ev) => {
                State.update({
                  searchVal: ev.target.value,
                });
                handleSearch();
              }}
            />
          </InputWarpper>
          <ScrollContent>
            {!!topTokens.length && (
              <QuickList>
                {topTokens.map((token) => (
                  <QuickItem
                    key={token.address}
                    onClick={() => {
                      props.onSelect?.(token);
                      props.onClose();
                    }}
                  >
                    <Widget
                      src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
                      props={{
                        size: 22,
                        token: token,
                      }}
                    />
                    <QuickSymbol>{token.symbol}</QuickSymbol>
                  </QuickItem>
                ))}
              </QuickList>
            )}
            <Tabs>
              {TABS.map((tab) => (
                <Tab
                  key={tab}
                  className={state.tab === tab && "active"}
                  onClick={() => {
                    State.update({
                      tab: tab,
                    });
                    handleSearch();
                  }}
                >
                  {tab}
                </Tab>
              ))}
            </Tabs>
            <CurrencyList>
              {state.loading && (
                <LoadingWrapper>
                  <Widget
                    src="bluebiu.near/widget/0vix.LendingLoadingIcon"
                    props={{
                      size: 30,
                    }}
                  />
                </LoadingWrapper>
              )}
              {state.importToken && (
                <Widget
                  src="dapdapbos.near/widget/Linea.Uniswap.Swap.CurrencyImportRow"
                  props={{
                    currency: state.importToken,
                    onImport: () => {
                      State.update({
                        showImportWarning: true,
                      });
                    },
                  }}
                />
              )}
              {state.tokens?.map((currency) => (
                <Widget
                  src="dapdapbos.near/widget/Linea.Uniswap.Swap.CurrencyRow"
                  props={{
                    selectedTokenAddress: props.selectedTokenAddress,
                    currency,
                    display: props.display,
                    chainId: chainId,
                    account,
                    onClick: () => {
                      props.onSelect?.(currency);
                      props.onClose();
                    },
                  }}
                  key={currency.address}
                />
              ))}
              {(!state.tokens || !state.tokens?.length) &&
                !state.loading &&
                !state.importToken && <Empty>No token.</Empty>}
            </CurrencyList>
          </ScrollContent>
          {state.loading && (
            <Widget
              src="dapdapbos.near/widget/Linea.Uniswap.Swap.Token"
              props={{
                address: state.searchVal,
                chainId: chainId,
                onSuccess: (importToken) => {
                  State.update({
                    importToken,
                    loading: false,
                  });
                },
                onError: (error) => {
                  State.update({
                    loading: false,
                  });
                },
              }}
            />
          )}
          <Widget
            src="dapdapbos.near/widget/Linea.Uniswap.Swap.ImportWarning"
            props={{
              display: state.showImportWarning,
              currency: state.importToken,
              onImport: (currency) => {
                onImport(currency);
                props.onSelect?.(currency);
                props.onClose();
              },
              explor: explor,
              onClose: () => {
                State.update({
                  showImportWarning: false,
                });
              },
            }}
          />
        </Content>
      </div>
    </Overlay>
  </Dialog>
);
