// Original widget: https://alpha.near.org/#/calebjacob.near/widget/Posts.Post
const accountId = props.accountId ?? context.accountId;
const blockHeight = props.blockHeight ?? "now";
const snipContent = props.snipContent ?? false;
const snippetMaxWords = props.snippetMaxWords ?? 40;
const content = props.content;
if (content?.text && snippet) {
  const text = content.text.split(" ");
  content.text = text.slice(0, snippetMaxWords);
  if (text.length >= snippetMaxWords) {
    content.text.push(props.snippedEnd ?? "...");
  }
  content.text = content.text.join(" ");
}
const key = props.key ?? JSON.stringify(content);
const postType = props.postType ?? "post";
const postBlockHeight =
  postType === "post" ? "blockHeight" : "commentBlockHeight";
const postUrl = `https://alpha.near.org/#/adminalpha.near/widget/PostPage?accountId=${accountId}&${postBlockHeight}=${blockHeight}`;
const onClick =
  props.onClick ??
  (() => {
    if (props.debug) {
      console.log(`clicked on post: ${postUrl}`);
    }
  });

const Post = styled.a`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 34px;
  overflow:hidden;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

`;
const Body = styled.div`
  align-items: center;
  flex: 1;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const ButtonLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }
`;

const Text = styled.p`
  display: block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #687076;
  white-space: nowrap;
`;
return (
  <Post href={postUrl} onPointerUp={onClick}>
    <Header>
      <Widget
        src="adminalpha.near/widget/AccountProfile"
        props={{
          accountId,
          hideAccountId: true,
        }}
      />
    </Header>

    <Body>
      {content.text && (
        <Widget
          src="dorgon108.near/widget/SocialMarkdown"
          props={{ text: content.text }}
        />
              {console.log("the text is:", context.text)}

      )}

      {content.image && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: content.image,
          }}
        />
      )}
    </Body>

    <ButtonLink href={postUrl} onPointerUp={onClick}>
      <img src="https://i.imgur.com/dIDX59g.png" alt="Open" />
    </ButtonLink>
  </Post>
);
