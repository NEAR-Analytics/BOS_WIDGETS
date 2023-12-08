const { chainId, name, CHAIN_LIST, DEFAULT_CHAIN_ID, curChainId, dappSrc } =
  props;

return (
  <Widget
    src={dappSrc}
    props={{
      ...props,
      defaultDex: name,
    }}
  />
);
