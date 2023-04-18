const dbAction = props.dbAction || "discuss";
const composeWidget = props.composeWidget;
const previewWidget = props.previewWidget;
const singlePageView = props.singlePageView;
const identifier = props.identifier;
const moderatorAccount = props.moderatorAccount || "adminalpha.near";

if (!identifier) {
  return "[NestedDiscussions.Feed] Please select an identifier for this discussion";
}

const index = {
  action: dbAction,
  key: identifier,
  options: {
    limit: 10,
    order: "desc",
  },
};

const Post = styled.div`
  border-bottom: 1px solid #ECEEF0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src={previewWidget}
        props={{
          identifier,
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          dbAction,
          composeWidget,
          previewWidget,
          singlePageView,
        }}
      />
    </Post>
  );

return (
  <Widget
    src="adminalpha.near/widget/IndexFeed"
    props={{ index, renderItem, moderatorAccount }}
  />
);
