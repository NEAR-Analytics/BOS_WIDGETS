const StyledContainer = styled.div`
  --button-color: #F49102;
  --button-text-color: #000;
`

// const {
//   dexConfig
// } = props
return (
  // <StyledContainer style={dexConfig.theme}>
  //   <Widget
  //     src="bluebiu.near/widget/Liquidity.Connector.BLASTOFF"
  //     props={{
  //       ...props
  //     }}
  //   />
  // </StyledContainer>

  <StyledContainer>
    <Widget
      src="bluebiu.near/widget/Liquidity.Connector.BLASTOFF"
      props={{
        ...props
      }}
    />
  </StyledContainer>
)