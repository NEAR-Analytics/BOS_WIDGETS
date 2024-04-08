const StyledContainer = styled.div`
`

const {
  dexConfig
} = props

return (
  <StyledContainer style={dexConfig.theme}>
    <Widget
      src="bluebiu.near/widget/Liquidity.Connector.GAMMA"
      props={{
        isDapps: true,
        dexConfig: props.dapps.Gamma,
        curChain: {
          chain_id: props.chainId,
          name: props.chainName
        },
        ...props
      }}
    />
  </StyledContainer>
)