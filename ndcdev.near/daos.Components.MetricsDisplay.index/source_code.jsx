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
      text={props.text.totalTreasury}
    />
    <Item
      value={deliverTreasury}
      loading={loading}
      text={props.text.deliverTreasury}
    />
    <Item
      value={typeOfProject}
      loading={loading}
      type="list"
      text={props.text.typeOfProject}
    />
  </Items>
);
