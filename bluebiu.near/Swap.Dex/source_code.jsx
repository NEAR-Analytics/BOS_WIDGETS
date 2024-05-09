const {
  account,
  curChain,
  bridgeCb,
  theme,
  dexConfig,
  isChainSupported,
  chainId,
} = props;

State.init({
  chainId: -1,
});

const Dex = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 26px;
  @media (max-width: 900px) {
    padding-top: 0px;
    flex-direction: column;
  }
  pre {
    display: none;
  }
`;

const WidgetWrapper = styled.div`
  width: 560px;
  position: relative;
  @media (max-width: 900px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const BridgeBanner = styled.div`
  width: 560px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 15px;
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
    }
    .text-l {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      letter-spacing: 0em;
    }
    .text-m {
      font-size: 14px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0em;
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
    <path d="M1 11L5 6L1 1" stroke="currentColor" strokeWidth="2" />
  </svg>
);
return (
  <Dex style={dexConfig.theme}>
    <WidgetWrapper>
      <Widget
        src="bluebiu.near/widget/Swap.Content"
        props={{
          ...props,
          account,
          chainId,
          chainIdNotSupport: !isChainSupported,
          onSwitchChain: props.onSwitchChain,
        }}
      />
      <BridgeBanner
        onClick={() => {
          if (!isChainSupported) return;
          if (bridgeCb) bridgeCb();
        }}
        style={theme?.bridge ? theme.bridge : {}}
      >
        <div className="bridge-text ">
          <img className="icon" src={curChain.logo} />

          <div className="text-wrapper">
            <div className="text-l">{curChain.name} Chain token bridge</div>
            <div className="text-m">{`Deposit tokens to the ${curChain.name} network`}</div>
          </div>
        </div>

        {ArrowRight}
      </BridgeBanner>
      {!isChainSupported && (
        <Widget
          src="bluebiu.near/widget/Swap.ChainWarnigBox"
          props={{
            chain: curChain,
            onSwitchChain: props.onSwitchChain,
            switchingChain: props.switchingChain,
            theme: dexConfig.theme?.button,
          }}
        />
      )}
    </WidgetWrapper>
  </Dex>
);
