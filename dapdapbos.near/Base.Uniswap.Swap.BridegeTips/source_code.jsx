const StyledContainer = styled.div`
  border-radius: 16px;
  background: var(--bridge-bg);
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  align-items: center;
  padding: 0px 26px 0px 23px;
  cursor: pointer;
  color: var(--text-color);
`;
const Flex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Title = styled.div`
  color: var(--text-color);
  font-family: Open Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Desc = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ChainLogo = styled.img`
  width: 28px;
  height: 28px;
`;

return (
  <StyledContainer onClick={props.onClick}>
    <Flex>
      <ChainLogo src={props.chainIcon} />
      <div>
        <Title>Native Base Bridge</Title>
        <Desc>Deposit tokens to the Base network</Desc>
      </div>
    </Flex>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
    >
      <path d="M1 11L5 6L1 1" stroke="currentColor" stroke-width="2" />
    </svg>
  </StyledContainer>
);
