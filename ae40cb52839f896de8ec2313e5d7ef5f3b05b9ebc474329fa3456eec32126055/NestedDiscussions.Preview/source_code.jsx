const dbAction = props.dbAction;
const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const composeWidget =
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Compose";
const previewWidget =
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview";
const notificationWidget =
  props.notificationWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions";

var notificationWidgetParams = props.notificationWidgetParams || {
  identifier,
};
const highlightComment = props.highlightComment;

const { content } = JSON.parse(
  Social.get(`${accountId}/${dbAction}/main`, blockHeight)
);

const postUrl = `https://near.org/#/${previewWidget}?accountId=${accountId}&blockHeight=${blockHeight}&dbAction=${dbAction}`;

State.init({ hasBeenFlagged: false });

// all children comments will be identified by this object
const item = {
  accountId,
  blockHeight,
  dbAction,
};

const Post = styled.div`
  position: relative;
  ${content.commentId == highlightComment ? "border: 1px solid yellow" : ""}

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: #eceef0;
  }
`;

const Header = styled.div`
  margin-bottom: 0;
  display: inline-flex;
`;

const Body = styled.div`
  padding-left: 52px;
  padding-bottom: 1px;
`;

const Content = styled.div`
  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    margin: 0 0 12px;
  }
`;

const Text = styled.p`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: -6px -6px 6px;
`;

const Comments = styled.div`
  > div > div:first-child {
    padding-top: 12px;
  }
`;

if (state.hasBeenFlagged) {
  return (
    <div className="alert alert-secondary">
      <i className="bi bi-flag" /> This content has been flagged for moderation
    </div>
  );
}

return (
  <>
    {commentId} , {highlightComment}
    <Post>
      <Header>
        <Widget
          src="calebjacob.near/widget/AccountProfile"
          props={{
            accountId,
            hideAccountId: true,
            inlineContent: (
              <>
                <Text as="span">･</Text>
                <Text>
                  <Widget
                    src="mob.near/widget/TimeAgo"
                    props={{ blockHeight }}
                  />{" "}
                  ago
                </Text>
              </>
            ),
          }}
        />
      </Header>
      <Body>
        <Content>
          {content.text && (
            <Widget
              src="calebjacob.near/widget/SocialMarkdown"
              props={{ text: content.text }}
            />
          )}

          {content.image && (
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: content.image,
              }}
            />
          )}
        </Content>

        {blockHeight !== "now" && (
          <Actions>
            <Widget
              src="near/widget/NestedDiscussions.Preview.LikeButton"
              props={{
                item,
                previewWidget,
                notifyAccountId: accountId,
              }}
            />
            <Widget
              src="near/widget/NestedDiscussions.Preview.CommentButton"
              props={{
                dbAction,
                item,
                onClick: () => State.update({ showReply: !state.showReply }),
              }}
            />
            <Widget
              src="calebjacob.near/widget/CopyUrlButton"
              props={{
                url: postUrl,
              }}
            />
            <Widget
              src="near/widget/FlagButton"
              props={{
                item: {
                  type: "social",
                  path: `${accountId}/discuss`,
                  blockHeight,
                },
                onFlag: () => {
                  State.update({ hasBeenFlagged: true });
                },
              }}
            />
          </Actions>
        )}

        {state.showReply && (
          <div className="mb-2">
            <Widget
              src={composeWidget}
              props={{
                dbAction,
                notifyAccountId: accountId,
                previewWidget,
                identifier: item,
                notificationWidget,
                notificationWidgetParams,
                onComment: () => State.update({ showReply: false }),
              }}
            />
          </div>
        )}

        <Comments>
          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Feed"
            props={{
              dbAction,
              identifier: item,
              composeWidget,
              previewWidget,
              moderatorAccount,
            }}
          />
        </Comments>
      </Body>
    </Post>
  </>
);
