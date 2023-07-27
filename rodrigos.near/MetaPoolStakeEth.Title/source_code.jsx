const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: black;
  display: inline-flex;
  gap: 20px;
  align-items: center;
`;

const Description = styled.div`
  font-size: 14px;
  color: #999999;
  margin-top: 5px;
`;

const StNEARIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.9474 50L0 25L5.94737 18.9474L24.9474 37.8947L43.9474 18.9474L50 25L24.9474 50ZM24.9474 30.9474L9.52632 15.4737L15.4737 9.57895L24.9474 19.0526L34.5263 9.57895L40.4211 15.4737L24.9474 30.9474ZM24.9474 12.1053L18.9474 5.94737L24.9474 0L31.0526 5.94737L24.9474 12.1053Z"
      fill="#0C2246"
    />
  </svg>
);
return (
  <>
    <Title>
      <StNEARIcon />
      Stake ETH
    </Title>
  </>
);
