const identifier = props.identifier;
const notifyAccountId = props.notifyAccountId;
const highlightComment = props.highlightComment;
const moderatorAccount = props.moderatorAccount || "bosmod.near";
const placeholder = props.placeholder || "Join the discussion";

// discussions happen inside other components
const parentComponent = props.parentComponent;
const parentParams = { ...props.parentParams };

if (!identifier) {
  return "[NestedDiscussions]: Please setup an identifier for the discussion";
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

return (
  <DiscussionContainer>
    {context.accountId ? (
      <ComposeWrapper>
        <Widget
          src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Compose"
          props={{
            placeholder,
            identifier,
            parentComponent,
            parentParams,
            notifyAccountId,
          }}
        />
      </ComposeWrapper>
    ) : (
      <p> Login to {placeholder.toLowerCase()} </p>
    )}
    <FeedWrapper>
      <Widget
        src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Feed"
        props={{
          indexKey: identifier,
          moderatorAccount,
          parentComponent,
          parentParams,
          highlightComment,
        }}
      />
    </FeedWrapper>
  </DiscussionContainer>
);
