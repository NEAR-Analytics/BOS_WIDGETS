const { Row } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Table.styled`,
);

const { ndcDAOs } = props;

return (
  <Widget
    src={`ndcdev.near/widget/Dashboard.Components.Table.Filters.index`}
    props={{ ndcDAOs }}
  />
);
