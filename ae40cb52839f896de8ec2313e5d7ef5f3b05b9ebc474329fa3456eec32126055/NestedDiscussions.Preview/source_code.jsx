const dbAction = props.dbAction;
const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const composeWidget =
  props.composeWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Compose";

const previewWidget =
  props.previewWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview";

const content = JSON.parse(
  Social.get(`${accountId}/${dbAction}/main`, blockHeight) ??
    '{"content": null}'
).content;

const item = {
  accountId,
  blockHeight,
  dbAction,
};

const postUrl = `https://alpha.near.org/#/${previewWidget}?accountId=${accountId}&blockHeight=${blockHeight}&dbAction=${dbAction}`;

const Post = styled.div`
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 19px;
    top: 52px;
    bottom: 12px;
    width: 2px;
    background: #ECEEF0;
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

return (
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
                <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />{" "}
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
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview.LikeButton"
            props={{
              item,
              previewWidget,
              notifyAccountId: accountId,
            }}
          />
          <Widget
            src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview.CommentButton"
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
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}

      <Comments>
        <Widget
          src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Feed"
          props={{
            identifier: item,
            highlightComment: props.highlightComment,
            composeWidget,
            previewWidget,
            moderatorAccount,
          }}
        />
      </Comments>
    </Body>
  </Post>
);
