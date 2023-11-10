const { currency, display, onClick } = props;
const CurrencyRow = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.active {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500px;
  color: #fff;
`;
const CurrencyName = styled.div`
  font-size: 14px;
  color: #fff;
  opacity: 0.5;
`;
const ImportButton = styled.button`
  border-radius: 18px;
  background: #5ee0ff;
  width: 103px;
  height: 36px;
  flex-shrink: 0;
  color: #131313;
  font-size: 16px;
  font-weight: 600;
  border: none;
`;

return (
  <CurrencyRow>
    <CurrencyLabel>
      <Widget
        src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
        props={{ size: 36, token: currency }}
      />
      <div>
        <CurrencySymbol>{currency.symbol}</CurrencySymbol>
        <CurrencyName>{currency.name}</CurrencyName>
      </div>
    </CurrencyLabel>
    <ImportButton
      onClick={() => {
        props.onImport?.();
      }}
    >
      Import
    </ImportButton>
  </CurrencyRow>
);
