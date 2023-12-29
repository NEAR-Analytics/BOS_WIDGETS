const {
  chainId,
  chainName,
  displayChainName,
  dexs,
  defalutDex,
  connectProps,
  ...restProps
} = props;

const { name, CHAIN_LIST, curChain, dappSrc } = props;

const CONNECT_PROPS = {
  ...connectProps,
  chainId,
  chainName,
};
// if (!account) {
//   return (
//     <Widget
//       src="dapdapbos.near/widget/Swap.ConnectButton"
//       props={{
//         ...CONNECT_PROPS,
//         isWrongNetwork: false,
//       }}
//     />
//   );
// }
const DEXS = Object.values(dexs || {});

State.init({
  chainId: -1,
  selectedDex: defalutDex,
});

const account = Ethers.send("eth_requestAccounts", [])[0];

useEffect(() => {
  if (!account) return;

  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({
        chainId,
        chainIdNotSupport: chainId !== curChain.chain_id,
      });
    })
    .catch(() => {});
}, [account]);

useEffect(() => {
  if (state.chainId === -1) return;
  State.update({
    chainIdNotSupport: state.chainId !== curChain.chain_id,
  });
}, [curChain]);

// if (state.chainId !== chainId) {
//   return (
//     <Widget
//       src="dapdapbos.near/widget/Swap.ConnectButton"
//       props={{
//         ...CONNECT_PROPS,
//         isWrongNetwork: true,
//       }}
//     />
//   );
// }

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

const BridgeBanner = styled.div`
  width: 560px;
  border-radius: 16px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: var(--dex-hover-bg-color);
  padding: 16px;
  margin: 0 auto;

  margin-top: 12px;

  .bridge-text {
    display: flex;
    align-items: center;
    gap: 12px;
    .icon {
      height: 30px;
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .text-l {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: center;
    }
    .text-m {
      font-size: 14px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
`;

const ArrowRight = (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 11L5 6L1 1" stroke="currentColor" stroke-width="2" />
  </svg>
);
return (
  <Dex>
    <WidgetWrapper>
      <Widget
        src="dapdapbos.near/widget/Swap.SwapV2"
        props={{
          title: state.selectedDex,
          dexConfig: dexs[state.selectedDex],
          account,
          chainId,
          chainIdNotSupport: state.chainIdNotSupport,
          ...props,
        }}
      />

      <BridgeBanner
        onClick={() => {
          if (state.chainIdNotSupport) return;
          restProps?.bridgeCb();
        }}
      >
        <div className="bridge-text ">
          <img className="icon" src={curChain.logo} />

          <div className="text-wrapper">
            <div className="text-l">{curChain.name} Chain token bridge</div>

            <div className="text-m">{curChain.name} Chain token bridge</div>
          </div>
        </div>

        {ArrowRight}
      </BridgeBanner>
    </WidgetWrapper>
  </Dex>
);
