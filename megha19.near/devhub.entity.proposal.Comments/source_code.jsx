const socialComments = Social.index("comment", props.item);

const [showReplyIndex, setShowReplyIndex] = useState(null);

const CommentContainer = styled.div`
  border: 1px solid lightgrey;
`;

const Header = styled.div`
  position: relative;
  background-color: #f4f4f4;
  height: 50px;

  .menu {
    position: absolute;
    right: 10px;
    top: 4px;
    font-size: 30px;
  }
`;

const Comment = ({ commentItem, arrayIndex }) => {
  const { accountId, blockHeight } = commentItem;
  const item = {
    type: "social",
    path: `${accountId}/post/comment`,
    blockHeight,
  };
  const content = JSON.parse(Social.get(item.path, blockHeight) ?? "null");

  const optimisticallyHideItem = (message) => {
    console.log(message);
  };
  const resolveHideItem = (message) => {
    console.log(message);
  };
  const cancelHideItem = () => {};

  const extractNotifyAccountId = (item) => {
    if (!item || item.type !== "social" || !item.path) {
      return undefined;
    }
    const accountId = item.path.split("/")[0];
    return `${accountId}/post/main` === item.path ? accountId : undefined;
  };
  const parentItem = content.item;
  const link = `https://near.org/mob.near/widget/MainPage.N.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;
  return (
    <div>
      <div className="d-flex gap-2 flex-1">
        <Widget
          src={"megha19.near/widget/devhub.entity.proposal.Profile"}
          props={{
            accountId: accountId,
          }}
        />
        <CommentContainer className="rounded-2 flex-1">
          <Header className="d-flex gap-3 align-items-center p-2 px-3">
            <div>
              {accountId} commented
              <Widget
                src="near/widget/TimeAgo"
                props={{
                  blockHeight: blockHeight,
                }}
              />
            </div>
            {context.accountId && (
              <div className="menu">
                <Widget
                  src="near/widget/Posts.Menu"
                  props={{
                    accountId: accountId,
                    blockHeight: blockHeight,
                    contentPath: `/post/comment`,
                    contentType: "comment",
                    parentFunctions: {
                      optimisticallyHideItem,
                      resolveHideItem,
                      cancelHideItem,
                    },
                  }}
                />
              </div>
            )}
          </Header>
          <div className="p-2 px-3">
            <Widget
              src={
                "megha19.near/widget/devhub.components.molecule.MarkdownViewer"
              }
              props={{
                text: content.text,
              }}
            />

            <div className="d-flex gap-2 align-items-center mt-4">
              <Widget
                src="near/widget/v1.LikeButton"
                props={{
                  item: item,
                }}
              />
              <Widget
                src="near/widget/CommentButton"
                props={{
                  item: item,
                  onClick: () => setShowReplyIndex(arrayIndex),
                }}
              />
              <Widget
                src="near/widget/CopyUrlButton"
                props={{
                  url: link,
                }}
              />
              <Widget
                src="near/widget/ShareButton"
                props={{
                  postType: "post",
                  url: link,
                }}
              />
            </div>
          </div>
        </CommentContainer>
      </div>
      {showReplyIndex === arrayIndex && (
        <div className="my-4" style={{ marginLeft: "50px" }} key="reply">
          <Widget
            src="megha19.near/widget/devhub.entity.proposal.ComposeComment"
            props={{
              notifyAccountId: extractNotifyAccountId(parentItem),
              item: parentItem,
            }}
          />
        </div>
      )}
    </div>
  );
};

if (socialComments.length) {
  return (
    <div className="d-flex flex-column gap-4">
      {socialComments.map((i, index) => (
        <Comment commentItem={i} arrayIndex={index} />
      ))}
    </div>
  );
}
