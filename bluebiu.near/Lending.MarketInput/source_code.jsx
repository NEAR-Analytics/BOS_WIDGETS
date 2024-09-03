const StyledBox = styled.div`
  background-color: var(--agg-secondary-color, #1b1e27);
  border: 1px solid var(--agg-primary-color, #33364b);
  width: 500px;
  height: 68px;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
`;
const StyledInput = styled.input`
  background-color: transparent;
  color: var(--agg-primary-color, #fff);

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 22px;
  border: none;
  outline: none;
`;
const StyledValue = styled.div`
  color: rgba(151, 154, 190, 0.3);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
`;
const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const StyledBalance = styled.div`
  color: #979abe;
  text-align: right;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
`;
const StyledBalanceAmount = styled.span`
  color: var(--agg-fourth-color, #fff);
  text-decoration-line: underline;
  cursor: pointer;
`;

const { icon, symbol, balance, price, amount, decimals, onChange } = props;

return (
  <StyledBox>
    <div>
      <StyledInput
        placeholder="0.0"
        value={amount || ""}
        onChange={(ev) => {
          if (isNaN(Number(ev.target.value))) return;
          onChange(ev.target.value.replace(/\s+/g, ""));
        }}
      />

      <StyledValue>
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.Total"
          props={{
            total: Big(amount || 0)
              .mul(price || 0)
              .toString(),
            digit: 2,
            unit: "$",
          }}
        />
      </StyledValue>
    </div>
    <StyledRight>
      <Widget
        src="bluebiu.near/widget/Lending.MarketAsset"
        props={{
          icon,
          symbol,
        }}
      />

      <StyledBalance>
        Balance:
        <StyledBalanceAmount
          onClick={() => {
            const _bal = Big(balance).toFixed(decimals).replace(/[.]?0*$/, '');
            onChange(_bal);
          }}
        >
          <Widget
            src="bluebiu.near/widget/Avalanche.Lending.Total"
            props={{
              total: balance,
              digit: 2,
              unit: "",
            }}
          />{" "}
        </StyledBalanceAmount>
        {symbol}
      </StyledBalance>
    </StyledRight>
  </StyledBox>
);
