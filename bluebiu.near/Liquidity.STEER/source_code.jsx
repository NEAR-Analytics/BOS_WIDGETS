const StyledContainer = styled.div`
`

const {
  dexConfig
} = props
return (
  <StyledContainer style={dexConfig.theme}>
    <Widget
      src="bluebiu.near/widget/Liquidity.Connector.STEER"
      props={{
        ...props
      }}
    />
  </StyledContainer>
)