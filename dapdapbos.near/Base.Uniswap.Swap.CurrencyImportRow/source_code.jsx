const { currency, display, disabled, onClick } = props;
const CurrencyRow = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #eeeeee;
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
  color: #8e8e8e;
`;
const CurrencyName = styled.div`
  font-size: 14px;
  color: #101010;
  opacity: 0.5;
`;
const ImportButton = styled.button`
  border-radius: 6px;
  background: #101010;
  width: 103px;
  height: 36px;
  flex-shrink: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border: none;
`;

return (
  <CurrencyRow
    style={{
      opacity: !disabled ? 1 : 0.6,
      cursor: !disabled ? "pointer" : "not-allowed",
    }}
  >
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
        if (!disabled) props.onImport?.();
      }}
    >
      Import
    </ImportButton>
  </CurrencyRow>
);
