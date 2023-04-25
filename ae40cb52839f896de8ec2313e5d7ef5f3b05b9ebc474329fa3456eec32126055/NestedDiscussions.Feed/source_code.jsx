const composeWidget = props.composeWidget;
const previewWidget = props.previewWidget;
const notificationWidget = props.notificationWidget;
const notificationWidgetParams = props.notificationWidgetParams;
const highlightComment = props.highlightComment;

const identifier = props.identifier;
const moderatorAccount = props.moderatorAccount;

const index = {
  action: "discuss",
  key: identifier,
  options: { subscribe: true },
};

const Post = styled.div`
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = ({ accountId, blockHeight }) => (
  <Post className="post" key={JSON.stringify({ accountId, blockHeight })}>
    <Widget
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview"
      props={{
        accountId,
        blockHeight,
        identifier,
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
