const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;
const StyledAmount = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledValue = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const { amount, price } = props;

return (
  <StyledBox>
    <StyledAmount>
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.Total"
        props={{
          total: amount,
          digit: 2,
          unit: "",
        }}
      />
    </StyledAmount>
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
  </StyledBox>
);
