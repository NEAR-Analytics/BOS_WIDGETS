const composeWidget =
  props.composeWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Compose";

const previewWidget =
  props.previewWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview";

const singlePageView =
  props.singlePageView ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.SinglePageView";

const dbAction = props.dbAction || "discuss";

const identifier = props.identifier;

if (!identifier) {
  return "[NestedDiscussions]: Please setup props.identifier";
}

const DiscussionContainer = styled.div`
  @media (max-width: 1200px) {
    > div:first-child {
      border-top: none;
    }
  }
`;

const ComposeWrapper = styled.div`
  border-top: 1px solid #ECEEF0;
  border-bottom: 1px solid #ECEEF0;
`;

const FeedWrapper = styled.div`
  .post {
    padding-left: 24px;
    padding-right: 24px;

    @media (max-width: 1200px) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
`;

const notLoggedMessage =
  props.notLoggedMessage || "Please login to join the discussion";

return (
  <DiscussionContainer>
    {context.accountId ? (
      <ComposeWrapper>
        <Widget src={composeWidget} props={{ dbAction, identifier }} />
      </ComposeWrapper>
    ) : (
      <p> {notLoggedMessage} </p>
    )}
    <FeedWrapper>
      <Widget
        src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Feed"
        props={{
          dbAction,
          composeWidget,
          previewWidget,
          singlePageView,
        }}
      />
    </FeedWrapper>
  </DiscussionContainer>
);
