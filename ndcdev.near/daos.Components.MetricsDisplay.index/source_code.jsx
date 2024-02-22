const { totalTreasury, deliverTreasury, typeOfProject, loading } = props;
const { Items } = VM.require(
  `ndcdev.near/widget/daos.Components.MetricsDisplay.styled`,
);

if (!Items) return <Widget src="flashui.near/widget/Loading" />;

const Item = ({ value, text, color, type }) => {
  return (
    <Widget
      src={`ndcdev.near/widget/daos.Components.MetricsDisplay.Item`}
      props={{ value, text, color, type }}
    />
  );
};

return (
  <Items>
    <Item
      value={totalTreasury}
      loading={loading}
      text="Total that we have"
    />
    <Item
      value={deliverTreasury}
      loading={loading}
      text="How much was delivered"
    />
    <Item
      value={typeOfProject}
      loading={loading}
      type="list"
      text="What types of projects do we support"
    />
  </Items>
);
