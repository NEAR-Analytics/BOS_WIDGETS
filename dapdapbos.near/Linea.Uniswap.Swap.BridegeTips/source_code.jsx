const StyledContainer = styled.div`
  border-radius: 16px;
  background: #1d2a30;
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  align-items: center;
  padding: 0px 26px 0px 23px;
  cursor: pointer;
`;
const Flex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Title = styled.div`
  color: #5ee0ff;
  font-family: Open Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Desc = styled.div`
  color: #5ee0ff;
  font-family: Open Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

return (
  <StyledContainer onClick={props.onClick}>
    <Flex>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.1762 6.88676C18.078 6.88676 19.6196 5.34511 19.6196 3.44338C19.6196 1.54165 18.078 0 16.1762 0C14.2745 0 12.7329 1.54165 12.7329 3.44338C12.7329 5.34511 14.2745 6.88676 16.1762 6.88676ZM0 3.04284H3.92385V16.8964H16.1759V20.5H0V3.04284Z"
          fill="#56DAFF"
        />
      </svg>
      <div>
        <Title>Linea Chain token bridge</Title>
        <Desc>Deposit tokens to Linea network.</Desc>
      </div>
    </Flex>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
    >
      <path d="M1 11L5 6L1 1" stroke="#5EE0FF" stroke-width="2" />
    </svg>
  </StyledContainer>
);
