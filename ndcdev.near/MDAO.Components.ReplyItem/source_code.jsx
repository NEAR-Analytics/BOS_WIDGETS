// Copy of old version of src/Posts/Post.jsx
const { item, showCreate } = props;
const accountId = context.accountId;

const Post = styled.div`
  position: relative;

  &:first-child {
    &::before {
      display: none;
    }
  }

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
  padding-bottom: 5px;

  &:first-child {
    padding-left: 0;
  }
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

const [showMore, setShowMore] = useState(null);
const [replies, setReplies] = useState([]);
const [liked, setLiked] = useState(false);
const [showReply, setShowReply] = useState({ [item.id]: showCreate });

const comments = Social.index("graph", "v2.ndc.mdao.reply", { order: "desc" });
let likes = Social.index("graph", "v2.ndc.mdao.like", { order: "desc" });
likes = likes ? likes.filter((like) => like.value.parentId === item.id) : [];
const myLike = likes ? likes.some((like) => like.value[accountId]) : false;
setLiked(myLike);

const handleLike = () => {
  Social.set({
    index: {
      graph: JSON.stringify({
        key: "v2.ndc.mdao.like",
        value: {
          parentId: item.id,
          [accountId]: !myLike,
        },
      }),
    },
  });
};

return (
  <Post>
    {item.text && (
      <Header>
        <div className="row">
          <div className="col-auto">
            <div className="d-flex gap-3 align-items-center">
              <Widget
                src="near/widget/AccountProfile"
                props={{
                  accountId: item.accountId,
                  hideAccountId: true,
                }}
              />
              <div className="text-secondary">
                <small>
                  <i className="bi bi-clock" />
                  {new Date(item.id).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </Header>
    )}

    <Body>
      {item.text && (
        <Content>
          <Widget
            src="near/widget/SocialMarkdown"
            props={{ text: item.text }}
          />
        </Content>
      )}
      {item.text && item.id && (
        <Actions>
          <div>
            {likes.length}
            <i className="bi bi-heart" onClick={handleLike} />
          </div>
          <div>
            <i
              className="bi bi-chat"
              onClick={() => setShowReply({ [item.id]: !showReply[item.id] })}
            />
          </div>
        </Actions>
      )}

      {showReply[item.id] && (
        <Widget
          src="ndcdev.near/widget/MDAO.Components.CreateReply"
          props={{ id: item.id }}
        />
      )}
      {comments.length > 0 && (
        <div>
          {comments
            .filter((repl) => repl.value.parentId === item.id)
            .map((item) => (
              <Widget
                src="ndcdev.near/widget/MDAO.Components.ReplyItem"
                props={{ item: item.value, showCreate: false }}
              />
            ))}
        </div>
      )}
    </Body>
  </Post>
);
