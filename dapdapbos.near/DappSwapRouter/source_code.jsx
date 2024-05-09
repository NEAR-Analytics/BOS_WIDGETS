const { chainId, name, CHAIN_LIST, dappSrc } = props;

return (
  <Widget
    src={dappSrc}
    props={{
      ...props,
      defaultDex: name,
    }}
  />
);
