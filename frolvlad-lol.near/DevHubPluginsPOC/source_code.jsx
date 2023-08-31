const plugins = [
  {
    tabTitle: "Telegram",
    bosComponent: "meta-pool-official.near/widget/MetaPoolStakeEth",
    bosProps: {},
  },
  {
    tabTitle: "Telegram2",
    bosComponent: "meta-pool-official.near/widget/MetaPoolStakeEth",
    bosProps: {},
  },
];

return (
  <ul>
    {plugins.map((plugin) => (
      <li>
        {plugin.tabTitle}:{" "}
        <Widget src={plugin.bosComponent} props={plugin.bosProps} />
      </li>
    ))}
  </ul>
);
