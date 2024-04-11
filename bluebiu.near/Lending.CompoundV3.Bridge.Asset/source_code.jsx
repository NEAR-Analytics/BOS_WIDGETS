
const StyledIconWrap = styled.div`
  position: relative;
`
const Icon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;
const StyledChainIcon = styled.div`
  position: absolute;
  right: -3px;
  bottom: -3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 1px;
  background: #262836;
  border-radius: 2px;
  img {
    width: 100%;
    height: 100%;
  }
`
const Symbol = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
const Asset = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  &.medium {
    ${Icon} {
      width: 32px;
      height: 32px;
    }
    ${StyledChainIcon} {
      width: 20px;
      height: 20px;
      right: -4px;
      bottom: -4px;
      padding: 2px;
      border-radius: 4px;
    }
  }
  &.big {
    ${Icon} {
      width: 36px;
      height: 36px;
    }
    ${StyledChainIcon} {
      width: 22px;
      height: 22px;
      right: -5px;
      bottom: -5px;
      padding: 3px;
      border-radius: 5px;
    }
  }
`;
const { icon, symbol, curChain, size } = props;

return (
  <Asset className={size}>
    <StyledIconWrap>
      <Icon src={icon} />
      <StyledChainIcon>
        <img src={curChain.logo} />
      </StyledChainIcon>
    </StyledIconWrap>
    {
      symbol && <Symbol>{symbol}</Symbol>
    }
  </Asset>
);
