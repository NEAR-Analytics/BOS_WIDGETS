const { totalTx, totalAccounts, uniqueAccounts, loading } = props;
const { Items } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.MetricsDisplay.styled`,
);

if (!Items) <Widget src="flashui.near/widget/Loading" />;
const Loading = () => <Widget src="flashui.near/widget/Loading" />;

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
      value={loading ? <Loading /> : totalTx}
      text="Total Number of Transactions"
      color="#A39ACD"
    />
    <Item
      value={loading ? <Loading /> : totalAccounts}
      text="Total Number of Accounts"
      color="#5398DD"
    />
    <Item
      value={loading ? <Loading /> : uniqueAccounts}
      text="Today Unique Active Users"
      color="#E89DBB"
    />
  </Items>
);
