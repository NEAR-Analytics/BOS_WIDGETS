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
  @media (max-width: 768px) {
    padding-left: 0px;
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
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    font-size: 13px;
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
        src="dapdapbos.near/widget/Linea.Uniswap.Swap.SwapV2"
        props={{
          dexConfig: dex,
          chainId: chainId,
          ...restProps,
        }}
      />
    </WidgetWrapper>
  </Dex>
);
