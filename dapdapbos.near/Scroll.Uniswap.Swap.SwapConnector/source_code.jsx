const { chainId, chainName, dex, ...restProps } = props;

const Dex = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  @media (max-width: 768px) {
    padding-top: 0px;
    flex-direction: column;
  }
`;
const WidgetWrapper = styled.div`
  width: 462px;
  @media (max-width: 768px) {
    width: calc(100vw - 16px);
    margin-top: 10px;
    box-sizing: border-box;
  }
`;

return (
  <Dex>
    <WidgetWrapper>
      <Widget
        src="dapdapbos.near/widget/Scroll.Uniswap.Swap.SwapV2"
        props={{
          dexConfig: dex,
          chainId: chainId,
          ...restProps,
        }}
      />
    </WidgetWrapper>
  </Dex>
);
