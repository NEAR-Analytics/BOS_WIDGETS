const account = Ethers.send("eth_requestAccounts", [])[0];
const {
  chainId,
  chainName,
  displayChainName,
  dexs,
  defalutDex,
  connectProps,
  CHAIN_LIST,
  ...restProps
} = props;

const CONNECT_PROPS = {
  ...connectProps,
  chainId,
  chainName,
};

const DEXS = Object.values(dexs || {});

State.init({
  chainId: -1,
  selectedDex: defalutDex,
});

const Dex = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  @media (max-width: 900px) {
    padding-top: 0px;
    flex-direction: column;
  }
`;
const Sider = styled.div`
  margin-right: 10px;
`;
const Title = styled.div`
  color: var(--text-color);
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding-left: 30px;
  padding-bottom: 10px;
  @media (max-width: 900px) {
    padding-left: 0px;
  }
`;
const List = styled.div`
  width: 250px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  padding: 10px;
  background-color: #181a27;
  @media (max-width: 900px) {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    background-color: transparent;
    border: none;
    border-radius: 0px;
    overflow-x: auto;
    padding-left: 0px;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background-color: transparent;
  transition: 0.5s;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    background-color: var(--dex-hover-bg-color);
  }
  &.active {
    color: var(--dex-active-text-color);
    background-color: var(--button-color);
  }
  @media (max-width: 900px) {
    margin-left: 10px;
    height: 42px;
    padding: 5px 10px;
    border-radius: 10px;
    &:first-child {
      margin-left: 0px;
    }
  }
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid var(--button-color);
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: #000;
  opacity: 0.5;
  &.active {
    opacity: 1;
  }
  @media (max-width: 900px) {
    margin-right: 10px;
  }
`;

const Icon = styled.img`
  width: 26px;
`;
const ChainName = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  @media (max-width: 900px) {
    font-size: 13px;
  }
`;
const DexName = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  @media (max-width: 900px) {
    font-size: 15px;
    white-space: nowrap;
  }
`;
const WidgetWrapper = styled.div`
  width: 560px;
  @media (max-width: 900px) {
    width: 100%;
    margin-top: 10px;
  }
`;

return (
  <Dex>
    <WidgetWrapper>
      <Widget
        src="dapdapbos.near/widget/Uniswap.Swap.SwapV2"
        props={{
          title: state.selectedDex,
          dexConfig: dexs[state.selectedDex],
          chainId: chainId,
          ...restProps,
        }}
      />
    </WidgetWrapper>
  </Dex>
);
