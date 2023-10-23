const List = styled.div`
  width: 494px;
  border-radius: 16px;
  background-color: var(--dialog-bg-color);
  position: absolute;
  top: 82px;
  right: 0px;
  display: none;
  z-index: 10;
  &.display {
    display: block;
  }
`;

const { display, selectedTokenAddress, onSelect } = props;
const tokens = props.tokens || [];

return (
  <List className={display ? "display" : ""}>
    {tokens?.map((token) => (
      <Widget
        key={token.address}
        src="bluebiu.near/widget/Base.Bridge.TokenRow"
        props={{
          display,
          currency: token,
          selectedTokenAddress,
          onSelect,
        }}
      />
    ))}
  </List>
);
