const dbAction = props.dbAction;
const composeWidget = props.composeWidget;
const previewWidget = props.previewWidget;
const notificationWidget = props.notificationWidget;
const notificationWidgetParams = props.notificationWidgetParams;
const highlightComment = props.highlightComment;

const identifier = props.identifier;
const moderatorAccount = props.moderatorAccount;

const index = {
  action: dbAction,
  key: identifier,
  options: { subscribe: true },
};

const Post = styled.div`
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
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          identifier,
          dbAction,
          composeWidget,
          previewWidget,
          moderatorAccount,
          notificationWidget,
          notificationWidgetParams,
          highlightComment,
        }}
      />
    </Post>
  );

return (
  <>
    <Widget
      src="near/widget/IndexFeed"
      props={{ index, renderItem, moderatorAccount, reverse: true }}
    />
  </>
);
