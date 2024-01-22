const { Row } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Table.styled`,
);

if (!Row) return <Widget src="flashui.near/widget/Loading" />;

const { ndcDAOs } = props;

return (
  <Widget
    src={`ndcdev.near/widget/Dashboard.Components.Table.Filters.index`}
    props={{ ndcDAOs }}
  />
);
