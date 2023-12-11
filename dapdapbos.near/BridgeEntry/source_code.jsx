const StyledContainer = styled.div`
  width: 560px;
  position: relative;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;
const StyledChainIcon = styled.img`
  width: 26px;
  height: 26px;
`;
const StyledChainName = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;
const StyledDrownWrapper = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: rgba(48, 49, 66, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const { chains, currentChain, ...restProps } = props;

return (
  <StyledContainer>
    <StyledHeader>
      {currentChain.logo && <StyledChainIcon src={currentChain.logo} />}
      <StyledChainName>{currentChain.name}</StyledChainName>
    </StyledHeader>
    <Widget
      src={currentChain.src}
      props={{
        layout: "center",
        ...restProps,
      }}
    />
  </StyledContainer>
);
