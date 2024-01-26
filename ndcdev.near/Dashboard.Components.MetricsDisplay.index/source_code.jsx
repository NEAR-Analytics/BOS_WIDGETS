const { totalTx, totalAccounts, uniqueAccounts, loading } = props;
const { Items } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.MetricsDisplay.styled`,
);

if (!Items) return <Widget src="flashui.near/widget/Loading" />;

const Item = ({ value, text, color }) => {
  return (
    <Widget
      src={`ndcdev.near/widget/Dashboard.Components.MetricsDisplay.Item`}
      props={{ value, text, color }}
    />
  );
};

return (
  <Items>
    <Item
      value={loading ? false : totalTx}
      text="Total Number of Transactions"
      color="#A39ACD"
    />
    <Item
      value={loading ? false : totalAccounts}
      text="Total Number of Accounts"
      color="#5398DD"
    />
    <Item
      value={loading ? false : uniqueAccounts}
      text="Today Unique Active Users"
      color="#E89DBB"
    />
  </Items>
);
