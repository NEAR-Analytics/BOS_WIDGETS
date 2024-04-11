const StyledBox = styled.div`
  display: flex;
`;
const StyledPrice = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;


const { price } = props;

return (
  <StyledBox>
    <StyledPrice>
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.Total"
        props={{
          total: price,
          digit: 2,
          unit: "$",
        }}
      />
    </StyledPrice>
  </StyledBox>
);
